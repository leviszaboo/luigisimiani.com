import { motion } from "framer-motion"
import MainTitle from "./MainTitle"
import Paragraph from "./Paragraph"
import { aboutMeTextBlockAnimationProps as textBlockAnimationProps } from "@/lib/animations"

interface ParagraphData {
  value: string;
}

interface TextBlockProps {
  paragraphs: ParagraphData[];
}

export default function TextBlock({ paragraphs }: TextBlockProps) {
  return (
    <motion.div className="flex-1 space-y-8" {...textBlockAnimationProps}>
      <MainTitle />
      {paragraphs.map((paragraph, i) => {
        return (
          <Paragraph text={paragraph.value} key={i} />
        )
      })}
    </motion.div>
  )
}
