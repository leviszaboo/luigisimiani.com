"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "@/app/context/UIContext";

import ContactForm from "./ContactForm";
import ContactLabel from "./ContactLabel";
import InfoBox from "./InfoBox";
import Signature from "./Signature";
import { contactFadeInAnimationProps as fadeInAnimationProps } from "@/lib/animations";
import FadeIn from "../FadeIn";

interface ContactInfo {
  email?: string;
  location?: string;
  instagram?: string;
  linkedin?: string;
}

interface ContactPageProps {
  contactInfo: ContactInfo;
}

export default function ContactPage({ contactInfo }: ContactPageProps) {
  const { isMenuVisible } = useUI();

  return (
    <AnimatePresence>
      {!isMenuVisible && (
        <motion.div {...fadeInAnimationProps}>
          <FadeIn>
            <ContactLabel />
          </FadeIn>
          <div className="flex flex-col lg:flex-row gap-8 px-8 py-8 max-w-6xl mx-auto">
            <ContactForm />
            <InfoBox contactInfo={contactInfo}/>
          </div>
          <Signature />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
