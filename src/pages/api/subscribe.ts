import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";
import { welcomeEmailTemplate } from "@/emails/welcome";

interface SubscribeResponse {
  message?: string;
  error?: string;
}

async function validateEmail(email: string): Promise<boolean> {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return false;
  }
  const client = await clientPromise;
  const db = client.db("newsletter");
  const existingSubscriber = await db
    .collection("subscribers")
    .findOne({ email });
  return !existingSubscriber;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscribeResponse>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  try {
    const isValidEmail = await validateEmail(email);
    if (!isValidEmail) {
      return res.status(400).json({
        error: "Invalid email or already subscribed",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_MAIL_USER,
        pass: process.env.ZOHO_MAIL_PASSWORD,
      },
    });

    // Store in database first
    const client = await clientPromise;
    const db = client.db("newsletter");
    await db.collection("subscribers").insertOne({
      email,
      subscribedAt: new Date(),
      status: "active",
      source: "website",
    });

    // Send welcome email
    await transporter.sendMail({
      from: process.env.ZOHO_MAIL_USER,
      to: email,
      subject: "🎉 Welcome to My Newsletter!",
      html: welcomeEmailTemplate,
    });

    // Notify admin
    await transporter.sendMail({
      from: process.env.ZOHO_MAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Newsletter Subscriber",
      text: `New subscriber: ${email}\nTime: ${new Date().toISOString()}`,
    });

    return res.status(200).json({
      message: "Successfully subscribed",
    });
  } catch (error) {
    console.error("Subscription error:", error);

    // Try to remove from database if email sending failed
    try {
      const client = await clientPromise;
      const db = client.db("newsletter");
      await db.collection("subscribers").deleteOne({ email });
    } catch (dbError) {
      console.error("Database cleanup error:", dbError);
    }

    return res.status(500).json({
      error: "Failed to process subscription",
    });
  }
}
