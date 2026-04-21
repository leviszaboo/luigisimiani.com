/**
 * Generate a simple blur placeholder SVG
 */
export function generateBlurPlaceholder(): string {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <rect width='100%' height='100%' fill='#1a1a1a'/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// Simple placeholder for document image arrays
export async function fetchBlurDataUrls(doc: {
  imageUrls?: string[];
}): Promise<string[]> {
  const placeholder = generateBlurPlaceholder();
  return (doc.imageUrls || []).map(() => placeholder);
}

// Simple placeholder for featured docs
export async function fetchFeaturedBlurDataUrls(
  docs: Array<{ url?: string }>
): Promise<string[]> {
  const placeholder = generateBlurPlaceholder();
  return docs.map(() => placeholder);
}
