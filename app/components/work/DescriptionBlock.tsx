import { memo } from "react";
import { motion } from "framer-motion";

import { galleryRowsDescriptionAnimationProps as descriptionAnimationProps } from "@/lib/animations";

interface DescriptionBlockProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

function DescriptionBlock({ title, subtitle, description }: DescriptionBlockProps) {
  return (
    <motion.div
      className="block description-block"
      {...descriptionAnimationProps}
    >
      <div className="image-title-wrapper">
        {title !== "" && (
          <div className="image-title">
            <h3>{title}</h3>
          </div>
        )}
        {subtitle !== "" && (
          <div className="image-subtitle">
            <h3>{subtitle}</h3>
          </div>
        )}
      </div>
      {description !== "" && (
        <div className="image-description">
          <h4>{description}</h4>
        </div>
      )}
    </motion.div>
  );
}

export default memo(DescriptionBlock);
