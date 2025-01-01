import nodemailer from "nodemailer";
import clientPromise from "./mongodb";
import { createNewsletterTemplate } from "@/emails/newsletter";
import crypto from "crypto";

interface SendNewsletterOptions {
  dryRun?: boolean;
}

export async function sendNewsletter(
  subject: string,
  content: string,
  options: SendNewsletterOptions = {},
) {
  const client = await clientPromise;
  const db = client.db("newsletter");

  // Get active subscribers
  const subscribers = await db
    .collection("subscribers")
    .find({ status: "active" })
    .toArray();

  console.log(`Found ${subscribers.length} active subscribers`);

  if (options.dryRun) {
    console.log("DRY RUN - No emails will be sent");
    console.log("Subject:", subject);
    console.log("Preview for first subscriber:");
    const previewEmail = createNewsletterTemplate(subject, content)
      .replace("{{email}}", subscribers[0]?.email || "test@example.com")
      .replace("{{token}}", "preview-token");
    console.log(previewEmail);
    return;
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

  console.log("Starting to send newsletters...");

  // Send to each subscriber
  for (const subscriber of subscribers) {
    const unsubscribeToken = crypto
      .createHash("sha256")
      .update(subscriber.email + process.env.UNSUBSCRIBE_SECRET)
      .digest("hex");

    const personalizedContent = createNewsletterTemplate(subject, content)
      .replace("{{email}}", subscriber.email)
      .replace("{{token}}", unsubscribeToken);

    try {
      await transporter.sendMail({
        from: process.env.ZOHO_MAIL_USER,
        to: subscriber.email,
        subject: subject,
        html: personalizedContent,
      });
      console.log(`✓ Sent to ${subscriber.email}`);
    } catch (error) {
      console.error(`✗ Failed to send to ${subscriber.email}:`, error);
    }

    // Add delay between emails
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Log newsletter sending
  await db.collection("newsletters").insertOne({
    subject,
    content,
    sentAt: new Date(),
    recipientCount: subscribers.length,
  });

  console.log("Newsletter sending completed!");
}
