"use server";

import { Resend } from "resend";
import { contactFormSchema } from "@/app/schema/contactFormSchema";
import { ZodError } from "zod";

// CRITICAL: Use server-side only env variable (no NEXT_PUBLIC_ prefix)
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailResult {
  success: boolean;
  error: string | null;
}

export async function sendEmail(formData: FormData): Promise<SendEmailResult> {
  try {
    // Extract and validate form data
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      website: formData.get("website") || "", // Honeypot field
    };

    // Validate with Zod schema
    const validatedData = contactFormSchema.parse(rawData);

    // Bot protection: if honeypot field is filled, reject silently
    if (validatedData.website) {
      return {
        success: true, // Return success to avoid revealing honeypot
        error: null,
      };
    }

    // Additional validation
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return {
        success: false,
        error: "Email service is not configured. Please try again later.",
      };
    }

    if (!process.env.USER_EMAIL) {
      console.error("USER_EMAIL is not configured");
      return {
        success: false,
        error: "Email service is not configured. Please try again later.",
      };
    }

    // Sanitize name for display (remove potential XSS)
    const sanitizedName = validatedData.name.replace(/[<>]/g, "");

    // Send email
    await resend.emails.send({
      from: `${sanitizedName} <contact-form@luigisimiani.com>`,
      to: process.env.USER_EMAIL,
      subject: "New Contact Form Submission",
      text: `From: ${sanitizedName}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`,
      reply_to: validatedData.email,
    });

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    console.error("Email send error:", err);

    // Don't expose internal errors to client
    if (err instanceof ZodError) {
      return {
        success: false,
        error: "Please check your form inputs and try again.",
      };
    }

    return {
      success: false,
      error: "Failed to send email. Please try again later.",
    };
  }
}
