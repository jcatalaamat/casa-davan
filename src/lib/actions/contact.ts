"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function submitContactForm(data: ContactFormData) {
  const validated = contactSchema.parse(data);

  await resend.emails.send({
    from: "Casa DaVan <noreply@casadavan.com>",
    to: ["hello@casadavan.com"],
    replyTo: validated.email,
    subject: `[Contact] ${validated.subject}`,
    text: `Name: ${validated.name}\nEmail: ${validated.email}\nSubject: ${validated.subject}\n\nMessage:\n${validated.message}`,
  });

  return { success: true };
}
