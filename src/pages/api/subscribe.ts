import { NextApiRequest, NextApiResponse } from "next";
import { SendMailClient } from "zeptomail";
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

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const isValidEmail = await validateEmail(email);
    if (!isValidEmail) {
      return res.status(400).json({
        error: "Invalid email or already subscribed",
      });
    }

    // Store in database first
    const client = await clientPromise;
    const db = client.db("newsletter");
    await db.collection("subscribers").insertOne({
      email,
      subscribedAt: new Date(),
      status: "active",
      source: "website",
    });

    // Initialize ZeptoMail client
    const url = "api.zeptomail.com/";
    const token = process.env.ZEPTOMAIL_TOKEN!;
    const mailClient = new SendMailClient({ url, token });

    // Send welcome email
    await mailClient.sendMail({
      from: {
        address: process.env.ZEPTOMAIL_FROM_EMAIL!,
        name: process.env.ZEPTOMAIL_FROM_NAME || "Shaoxuan",
      },
      to: [
        {
          email_address: {
            address: email,
            name: email.split("@")[0],
          },
        },
      ],
      subject: "🎉 Welcome to My Newsletter!",
      htmlbody: welcomeEmailTemplate,
      track_clicks: true,
      track_opens: true,
    });

    // Notify admin
    await mailClient.sendMail({
      from: {
        address: process.env.ZEPTOMAIL_FROM_EMAIL!,
        name: process.env.ZEPTOMAIL_FROM_NAME || "Shaoxuan",
      },
      to: [
        {
          email_address: {
            address: process.env.ADMIN_EMAIL!,
            name: "Admin",
          },
        },
      ],
      subject: "New Newsletter Subscriber",
      textbody: `New subscriber: ${email}\nTime: ${new Date().toISOString()}`,
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
      error:
        error instanceof Error
          ? error.message
          : "Failed to process subscription",
    });
  }
}
