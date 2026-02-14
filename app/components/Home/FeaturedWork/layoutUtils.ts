import type { Gallery, DisplaySize } from "@/app/types/content";

export interface GalleryRow {
  items: Gallery[];
  gridClass: string;
}

/**
 * Get the "weight" of a display size for row calculation.
 * Full = 6, Half = 3, Third = 2 (based on 6-column grid)
 */
function getDisplayWeight(size: DisplaySize): number {
  switch (size) {
    case "full":
      return 6;
    case "half":
      return 3;
    case "third":
      return 2;
    default:
      return 3;
  }
}

/**
 * Get the Tailwind grid column span class for a display size
 */
export function getColSpanClass(size: DisplaySize): string {
  switch (size) {
    case "full":
      return "md:col-span-6";
    case "half":
      return "md:col-span-3";
    case "third":
      return "md:col-span-2";
    default:
      return "md:col-span-3";
  }
}

/**
 * Get the desktop aspect ratio class for a display size.
 * Full-width: cinematic 21:9, Half: landscape 3:2, Third: portrait 4:5
 */
export function getAspectClass(size: DisplaySize): string {
  switch (size) {
    case "full":
      return "aspect-[21/9]";
    case "third":
      return "aspect-[4/5]";
    case "half":
    default:
      return "aspect-[3/2]";
  }
}

/**
 * Group galleries into rows based on their display sizes.
 * Each row can hold up to 6 "weight" units.
 */
export function groupIntoRows(galleries: Gallery[]): GalleryRow[] {
  const rows: GalleryRow[] = [];
  let currentRow: Gallery[] = [];
  let currentWeight = 0;
  const maxWeight = 6;

  for (const gallery of galleries) {
    const size = gallery.displaySize || "half";
    const weight = getDisplayWeight(size);

    if (currentWeight + weight > maxWeight && currentRow.length > 0) {
      rows.push({
        items: currentRow,
        gridClass: "grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6",
      });
      currentRow = [];
      currentWeight = 0;
    }

    currentRow.push(gallery);
    currentWeight += weight;

    if (currentWeight === maxWeight) {
      rows.push({
        items: currentRow,
        gridClass: "grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6",
      });
      currentRow = [];
      currentWeight = 0;
    }
  }

  if (currentRow.length > 0) {
    rows.push({
      items: currentRow,
      gridClass: "grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6",
    });
  }

  return rows;
}
