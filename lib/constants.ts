// Responsive breakpoints (in pixels)
export const BREAKPOINTS = {
  MOBILE: 650,
  TABLET: 1000,
} as const;

// Aspect ratio breakpoints for image layout decisions
export const ASPECT_RATIO = {
  PORTRAIT_THRESHOLD: 0.85, // Below this is vertical/portrait
  LANDSCAPE_THRESHOLD: 1.2, // Above this is wide/landscape
} as const;

// Image dimensions
export const IMAGE_DIMENSIONS = {
  HORIZONTAL: {
    WIDTH: 1920,
    HEIGHT: 1080,
  },
  VERTICAL: {
    WIDTH: 1080,
    HEIGHT: 1920,
  },
} as const;

// Blur placeholder dimensions
export const BLUR_PLACEHOLDER = {
  WIDTH: 100,
  DEFAULT_ASPECT_RATIO: 1,
} as const;
