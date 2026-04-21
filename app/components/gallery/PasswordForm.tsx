"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface PasswordFormProps {
  galleryTitle: string;
  onSubmit: (password: string) => Promise<boolean>;
  onBypass?: () => void;
  allowBypass?: boolean;
}

export default function PasswordForm({
  galleryTitle,
  onSubmit,
  onBypass,
  allowBypass = true,
}: PasswordFormProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [flowerClicks, setFlowerClicks] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await onSubmit(password);
      if (!success) {
        setError("Incorrect password");
        setPassword("");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlowerClick = () => {
    if (!allowBypass || !onBypass) return;

    const newCount = flowerClicks + 1;
    setFlowerClicks(newCount);

    if (newCount >= 5) {
      onBypass();
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-sm text-center">
        {/* Floating Flower */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0],
          }}
          transition={{
            delay: 0.2,
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
        >
          <button
            type="button"
            onClick={handleFlowerClick}
            className="w-16 h-16 relative opacity-30 hover:opacity-50 transition-opacity cursor-default"
            style={{ cursor: allowBypass ? "pointer" : "default" }}
          >
            <Image
              src="/images/galleries/flower.png"
              alt=""
              fill
              className="object-contain"
            />
          </button>
        </motion.div>

        <h1 className="text-sm uppercase tracking-wider mb-2">{galleryTitle}</h1>
        <p className="text-xs text-white/50 mb-8">
          This gallery is password protected
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-center focus:outline-none focus:border-white/50 transition-colors"
              autoFocus
              disabled={isLoading}
            />
          </div>

          {error && (
            <motion.p
              className="text-xs text-red-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full border border-white/30 px-4 py-3 text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Enter"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
