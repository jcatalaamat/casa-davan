"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormValues) {
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-sm font-medium text-charcoal font-body"
        >
          {t("name")}
        </label>
        <Input
          id="contact-name"
          type="text"
          className={cn(errors.name && "border-red-400 focus-visible:ring-red-400")}
          disabled={status === "loading" || status === "success"}
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-sm font-medium text-charcoal font-body"
        >
          {t("email")}
        </label>
        <Input
          id="contact-email"
          type="email"
          className={cn(errors.email && "border-red-400 focus-visible:ring-red-400")}
          disabled={status === "loading" || status === "success"}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="contact-subject"
          className="mb-1.5 block text-sm font-medium text-charcoal font-body"
        >
          {t("subject")}
        </label>
        <Input
          id="contact-subject"
          type="text"
          className={cn(errors.subject && "border-red-400 focus-visible:ring-red-400")}
          disabled={status === "loading" || status === "success"}
          {...register("subject")}
        />
        {errors.subject && (
          <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-charcoal font-body"
        >
          {t("message")}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          className={cn(
            "flex w-full rounded-lg border border-sand bg-cream px-4 py-3 font-body text-sm text-charcoal placeholder:text-charcoal/40 transition-colors resize-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
            "disabled:cursor-not-allowed disabled:opacity-50",
            errors.message && "border-red-400 focus-visible:ring-red-400"
          )}
          disabled={status === "loading" || status === "success"}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        size="lg"
        disabled={status === "loading" || status === "success"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          t("submit")
        )}
      </Button>

      {/* Status messages */}
      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-lg bg-sage-light/30 p-4 text-sm text-forest"
          >
            <CheckCircle className="h-4 w-4 shrink-0" />
            <span>{t("success")}</span>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-lg bg-terracotta-light/20 p-4 text-sm text-terracotta-dark"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{t("error")}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
