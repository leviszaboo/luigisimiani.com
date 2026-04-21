"use server";

import {
  verifyGalleryPassword,
  fetchGalleryById,
  isPasswordProtected,
} from "@/lib/content";
import type { Gallery } from "@/app/types/content";

export interface VerifyPasswordResult {
  success: boolean;
  error?: string;
  gallery?: Omit<Gallery, "password">;
}

/**
 * Server action to verify gallery password
 */
export async function verifyPassword(
  slug: string,
  password: string
): Promise<VerifyPasswordResult> {
  try {
    if (!slug || typeof slug !== "string") {
      return {
        success: false,
        error: "Invalid gallery slug",
      };
    }

    const gallery = await fetchGalleryById(slug);

    if (!gallery) {
      return {
        success: false,
        error: "Gallery not found",
      };
    }

    // If not protected (no password set), return gallery
    if (!isPasswordProtected(gallery)) {
      const { password: _, ...safeGallery } = gallery;
      return {
        success: true,
        gallery: safeGallery,
      };
    }

    // Verify password
    const isValid = await verifyGalleryPassword(slug, password);

    if (!isValid) {
      return {
        success: false,
        error: "Incorrect password",
      };
    }

    // Return gallery data without password
    const { password: _, ...safeGallery } = gallery;
    return {
      success: true,
      gallery: safeGallery,
    };
  } catch (error) {
    console.error("Password verification error:", error);
    return {
      success: false,
      error: "An error occurred. Please try again.",
    };
  }
}
