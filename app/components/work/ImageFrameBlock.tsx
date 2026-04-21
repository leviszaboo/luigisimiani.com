import { memo } from "react";
import { motion } from "framer-motion";
import { galleryRowsFrameAnimationProps as frameAnimationProps } from "@/lib/animations";
import Image from "../Image";

interface ImageFrameBlockProps {
  src: string;
  base64?: string;
  vertical?: boolean;
}

function ImageFrameBlock({ src, base64 = "", vertical = false }: ImageFrameBlockProps) {
  return (
    <motion.div className="block" {...frameAnimationProps}>
      <Image
        src={src}
        width={vertical ? 2000 : 3000} // 4160 : 5616
        height={vertical ? 2500 : 2000} // 5200 : 3744
        alt=""
        loading="lazy"
        placeholder="blur"
        blurDataURL={base64}
        sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, (max-width: 1920px) 1920px, 2560px"
      />
    </motion.div>
  );
}

export default memo(ImageFrameBlock);
