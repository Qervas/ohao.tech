import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";
import { unsubscribeTemplate } from "@/emails/unsubscribe";
import crypto from "crypto";

interface UnsubscribeResponse {
  message?: string;
  error?: string;
}

// Function to validate unsubscribe token
const validateToken = (email: string, token: string): boolean => {
  const expectedToken = crypto
    .createHash("sha256")
    .update(email + process.env.UNSUBSCRIBE_SECRET)
    .digest("hex");
  return token === expectedToken;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UnsubscribeResponse>,
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, token } = req.method === "POST" ? req.body : req.query;

  if (!email || !token) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  // Validate token
  if (!validateToken(email, token)) {
    return res.status(403).json({ error: "Invalid unsubscribe token" });
  }

  try {
    // Update subscriber status in database
    const client = await clientPromise;
    const db = client.db("newsletter");
    const result = await db.collection("subscribers").updateOne(
      { email },
      {
        $set: {
          status: "unsubscribed",
          unsubscribedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Subscriber not found" });
    }

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_MAIL_USER,
        pass: process.env.ZOHO_MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.ZOHO_MAIL_USER,
      to: email,
      subject: "Unsubscribe Confirmation",
      html: unsubscribeTemplate,
    });

    // For GET requests, redirect to a confirmation page
    if (req.method === "GET") {
      res.redirect(307, "/unsubscribed");
      return;
    }

    return res.status(200).json({ message: "Successfully unsubscribed" });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return res
      .status(500)
      .json({ error: "Failed to process unsubscribe request" });
  }
}
