"use client"

import { motion } from "framer-motion"
import { contactFadeInScaleAnimationProps as fadeInScaleAnimationProps } from "@/lib/animations"

export default function ContactLabel() {
  return (
    <motion.div {...fadeInScaleAnimationProps}>
      <div className="pt-28 pb-8 px-8 text-center">
        <h1 className="retro text-lg md:text-xl uppercase tracking-wider">LET&apos;S GET IN TOUCH.</h1>
      </div>
    </motion.div>
  )
}
