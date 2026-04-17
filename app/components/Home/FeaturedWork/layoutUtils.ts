import type { Gallery, DisplaySize } from "@/app/types/content";

export type Row =
  | { type: "galleries"; items: Gallery[] }
  | { type: "quote"; data: { text: string; author?: string } };

const WEIGHT: Record<DisplaySize, number> = {
  full: 6,
  half: 3,
  third: 2,
};

const MAX_WEIGHT = 6;

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

export function getAspectClass(size: DisplaySize): string {
  switch (size) {
    case "full":
      return "aspect-[16/9]";
    case "half":
      return "aspect-[4/3]";
    case "third":
      return "aspect-[3/4]";
    default:
      return "aspect-[4/3]";
  }
}

function displaySize(g: Gallery): DisplaySize {
  return g.displaySize ?? "half";
}

/**
 * Group galleries into rows of weight-6, interleaving quotes between rows.
 * A quote is inserted after every ~3rd gallery (consumed in order).
 */
export function buildLayoutRows(
  galleries: Gallery[],
  quotes: { text: string; author?: string }[] = []
): Row[] {
  const rows: Row[] = [];
  let currentRow: Gallery[] = [];
  let currentWeight = 0;
  let galleriesSinceQuote = 0;
  let quoteIdx = 0;

  const flushRow = () => {
    if (currentRow.length > 0) {
      rows.push({ type: "galleries", items: currentRow });
      currentRow = [];
      currentWeight = 0;
    }
  };

  const maybeInsertQuote = () => {
    if (galleriesSinceQuote >= 3 && quoteIdx < quotes.length) {
      rows.push({ type: "quote", data: quotes[quoteIdx++] });
      galleriesSinceQuote = 0;
    }
  };

  for (const gallery of galleries) {
    const weight = WEIGHT[displaySize(gallery)] ?? WEIGHT.half;

    if (currentWeight + weight > MAX_WEIGHT) {
      flushRow();
      maybeInsertQuote();
    }

    currentRow.push(gallery);
    currentWeight += weight;
    galleriesSinceQuote += 1;

    if (currentWeight === MAX_WEIGHT) {
      flushRow();
      maybeInsertQuote();
    }
  }

  flushRow();

  return rows;
}
