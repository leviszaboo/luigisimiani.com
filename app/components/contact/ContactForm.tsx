"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { sendEmail } from "@/app/actions/sendEmail";
import { contactFormAnimationProps } from "@/lib/animations";
import ContactFormFooter from "./ContactFormFooter";
import { contactFormSchema } from "@/app/schema/contactFormSchema";
import { Input, Textarea } from "@/components/ui/8bit/input";
import { ZodError } from "zod";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (error || message) {
      const timeout = setTimeout(() => {
        setError(null);
        setMessage(null);
      }, 3500);

      return () => clearTimeout(timeout);
    }
  }, [error, message]);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const data = Object.fromEntries(formData);
      contactFormSchema.parse(data);

      const res = await sendEmail(formData);

      if (!res.success) {
        setError(res.error || "Something went wrong.");
      } else {
        setMessage("Talk to you soon!");
        if (formRef.current) formRef.current.reset();
      }
    } catch (err) {
      if (err instanceof ZodError) {
        const firstError = err.errors[0];
        setError(firstError?.message || "Invalid form inputs.");
      } else {
        setError("Invalid form inputs.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div className="flex-1" {...contactFormAnimationProps}>
      <div className="w-full border-2 border-white/30 p-6">
        <form ref={formRef} className="flex flex-col gap-6" action={onSubmit}>
          <div>
            <label className="retro text-[10px] uppercase tracking-wider text-white/70 mb-2 block">NAME</label>
            <Input
              placeholder="Enter your name"
              name="name"
              type="text"
              required
              disabled={loading}
              minLength={2}
              maxLength={100}
            />
          </div>
          <div>
            <label className="retro text-[10px] uppercase tracking-wider text-white/70 mb-2 block">EMAIL</label>
            <Input
              placeholder="Enter your email"
              name="email"
              type="email"
              required
              disabled={loading}
              maxLength={255}
            />
          </div>
          <div>
            <label className="retro text-[10px] uppercase tracking-wider text-white/70 mb-2 block">MESSAGE</label>
            <Textarea
              placeholder="Enter your message"
              name="message"
              required
              disabled={loading}
              minLength={10}
              maxLength={5000}
              rows={6}
            />
          </div>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] w-px h-px"
            aria-hidden="true"
          />
          <ContactFormFooter
            message={message}
            error={error}
          />
        </form>
      </div>
    </motion.div>
  );
}
