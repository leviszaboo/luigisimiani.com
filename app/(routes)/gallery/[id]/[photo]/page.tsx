import Menu from "@/app/components/Menu/Menu/Menu";
import MemorizePosition from "@/app/components/Work/MemorizePosition";
import {
  fetchGalleries,
  fetchGalleryById,
  isPasswordProtected,
  isDownloadable,
  hasTag,
} from "@/app/lib/content";
import ProtectedGallery from "@/app/components/Gallery/ProtectedGallery";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  const galleries = await fetchGalleries(undefined, true);
  const params: { id: string; photo: string }[] = [];
  for (const gallery of galleries) {
    for (let i = 0; i < gallery.imageUrls.length; i++) {
      params.push({ id: gallery.id as string, photo: String(i + 1) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; photo: string }>;
}) {
  const { id, photo } = await params;
  const gallery = await fetchGalleryById(id);

  return {
    title: gallery?.title
      ? `${gallery.title} #${photo} | Luigi Simiani`
      : "Gallery",
    description: gallery?.subTitle || "Photography by Luigi Simiani",
  };
}

export default async function GalleryPhotoPage({
  params,
}: {
  params: Promise<{ id: string; photo: string }>;
}) {
  const { id, photo } = await params;
  const gallery = await fetchGalleryById(id);

  if (!gallery) {
    notFound();
  }

  const idx = parseInt(photo, 10) - 1;
  if (Number.isNaN(idx) || idx < 0 || idx >= gallery.imageUrls.length) {
    notFound();
  }

  const isProtected = isPasswordProtected(gallery);
  const canDownload = isDownloadable(gallery);
  const hasProtectTag = hasTag(gallery, "protect");

  const safeGallery = isProtected
    ? { ...gallery, password: undefined }
    : gallery;

  return (
    <MemorizePosition>
      <ProtectedGallery
        gallery={safeGallery}
        isProtected={isProtected}
        isDownloadable={canDownload}
        allowBypass={!hasProtectTag}
        initialPhotoIndex={idx}
      />
      <Menu />
    </MemorizePosition>
  );
}
