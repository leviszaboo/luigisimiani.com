"use client";

import { useState } from "react";
import type { Gallery } from "@/app/types/content";
import GalleryView from "./GalleryView";
import PasswordForm from "./PasswordForm";
import { verifyPassword } from "@/app/actions/verifyPassword";

interface ProtectedGalleryProps {
  gallery: Gallery;
  isProtected: boolean;
  isDownloadable?: boolean;
  allowBypass?: boolean;
}

export default function ProtectedGallery({
  gallery,
  isProtected,
  isDownloadable = false,
  allowBypass = true,
}: ProtectedGalleryProps) {
  const [unlockedGallery, setUnlockedGallery] = useState<Gallery | null>(
    isProtected ? null : gallery
  );

  const handlePasswordSubmit = async (password: string): Promise<boolean> => {
    const result = await verifyPassword(gallery.id, password);

    if (result.success && result.gallery) {
      setUnlockedGallery(result.gallery as Gallery);
      return true;
    }

    return false;
  };

  const handleBypass = () => {
    setUnlockedGallery(gallery);
  };

  if (!unlockedGallery) {
    return (
      <PasswordForm
        galleryTitle={gallery.title}
        onSubmit={handlePasswordSubmit}
        onBypass={handleBypass}
        allowBypass={allowBypass}
      />
    );
  }

  return <GalleryView gallery={unlockedGallery} isDownloadable={isDownloadable} />;
}
