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

const newsletterSchema = z.object({
  email: z.string().email(),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export function Newsletter() {
  const t = useTranslations("home.newsletter");
  const tCommon = useTranslations("common");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  async function onSubmit(data: NewsletterFormValues) {
    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) throw new Error("Failed to subscribe");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section-padding bg-gradient-forest text-cream">
      <div className="container-narrow text-center">
        <h2 className="heading-2 text-cream">{t("title")}</h2>
        <p className="mt-4 max-w-xl mx-auto text-base text-cream/70 font-body leading-relaxed">
          {t("description")}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            placeholder={t("placeholder")}
            className={cn(
              "flex-1 border-cream/20 bg-cream/10 text-cream placeholder:text-cream/40",
              "focus-visible:ring-gold focus-visible:ring-offset-forest",
              errors.email && "border-red-400"
            )}
            disabled={status === "loading" || status === "success"}
            {...register("email")}
          />
          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="bg-gold text-forest hover:bg-gold-light"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              tCommon("subscribe")
            )}
          </Button>
        </form>

        {/* Status messages */}
        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center justify-center gap-2 text-sm text-sage-light"
            >
              <CheckCircle className="h-4 w-4" />
              <span>{t("success")}</span>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center justify-center gap-2 text-sm text-terracotta-light"
            >
              <AlertCircle className="h-4 w-4" />
              <span>{t("error")}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
