import { AnimatePresence } from "framer-motion";

import { useUI } from "@/app/context/UIContext";
import DescriptionBlock from "./DescriptionBlock";
import ImageFrameBlock from "./ImageFrameBlock";

const LAYOUT_CLASSES: Record<string, string> = {
  left_single: "a",
  right_single: "b",
  right_double: "c",
  left_double: "d",
};

interface GalleryRowDoc {
  imageUrls: string[];
  descriptionLayout?: string;
  base64?: string[];
}

interface GalleryRowProps {
  doc: GalleryRowDoc;
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function GalleryRow({ doc, title, subtitle, description }: GalleryRowProps) {
  const { isMenuVisible } = useUI();

  const imageCount = doc.imageUrls.length;
  const layout = doc.descriptionLayout || "left";

  // Determine the CSS class based on layout and image count
  const layoutKey = `${layout}_${imageCount === 1 ? "single" : "double"}`;
  const gridClass = LAYOUT_CLASSES[layoutKey] || "a";

  return (
    <AnimatePresence>
      {!isMenuVisible && (
        <div className={`grid-row ${gridClass}`}>
          {imageCount === 2 ? (
            <>
              <ImageFrameBlock
                src={doc.imageUrls[0]}
                vertical={true}
                base64={doc.base64?.[0]}
              />
              <ImageFrameBlock
                src={doc.imageUrls[1]}
                vertical={true}
                base64={doc.base64?.[1]}
              />
            </>
          ) : (
            <ImageFrameBlock src={doc.imageUrls[0]} base64={doc.base64?.[0]} />
          )}
          <DescriptionBlock
            title={title}
            subtitle={subtitle}
            description={description}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
