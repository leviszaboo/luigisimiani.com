"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { contactFadeInScaleAnimationProps as fadeInScaleAnimationProps } from "@/lib/animations"

export default function Signature() {
  return (
    <motion.div {...fadeInScaleAnimationProps}>
    <div className="py-8 text-center">
       <p className="text-xs text-white/50 retro">
         Developed by&nbsp;
         <Link href={"https://github.com/leviszaboo"} target="_blank" className="hover:text-[#ffdba5] transition-colors">
          Levi
         </Link>
       </p>
    </div>
    </motion.div>
  )
}
