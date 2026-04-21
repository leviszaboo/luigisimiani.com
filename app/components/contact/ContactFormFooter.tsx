"use client"

import RollingButton from "../RollingButton"
import { useFormStatus } from 'react-dom'
import Loader from "./Loader"
import { contactFadeInScaleAnimationProps as fadeInScaleAnimationProps } from "@/lib/animations"
import { AnimatePresence, motion } from "framer-motion"

interface ContactFormFooterProps {
  message: string | null;
  error: string | null;
}

export default function ContactFormFooter({ message, error }: ContactFormFooterProps) {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center gap-4 mt-4 flex-wrap">
      <RollingButton
        className={pending ? "opacity-50 cursor-not-allowed" : ""}
        type="submit"
        disabled={pending}
        text={"SEND"}
      />
      <AnimatePresence>
      {message && (
          <motion.div {...fadeInScaleAnimationProps} className="ml-auto">
          <h2 className="text-sm text-[#ffdba5]">{message}</h2>
          </motion.div>
      )}
      </AnimatePresence>
      <AnimatePresence>
        {error && (
          <motion.div {...fadeInScaleAnimationProps} className="ml-auto">
            <h2 className="text-sm text-red-400">{error}</h2>
          </motion.div>
        )}
      </AnimatePresence>
      {pending && <Loader />}
    </div>
  )
}
