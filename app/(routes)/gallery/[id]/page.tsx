import Menu from "@/app/components/menu/Menu";
import MemorizePosition from "@/app/components/work/MemorizePosition";
import {
  fetchGalleries,
  fetchGalleryById,
  isPasswordProtected,
  isDownloadable,
  hasTag,
} from "@/lib/content";
import ProtectedGallery from "@/app/components/gallery/ProtectedGallery";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  // Include hidden galleries for static generation
  const galleries = await fetchGalleries(undefined, true);
  return galleries.map((gallery) => ({
    id: gallery.id as string,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gallery = await fetchGalleryById(id);

  return {
    title: gallery?.title ? `${gallery.title} | Luigi Simiani` : "Gallery",
    description: gallery?.subTitle || "Photography by Luigi Simiani",
  };
}

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gallery = await fetchGalleryById(id);

  if (!gallery) {
    notFound();
  }

  const isProtected = isPasswordProtected(gallery);
  const canDownload = isDownloadable(gallery);
  const hasProtectTag = hasTag(gallery, "protect");

  // Remove password from gallery before passing to client
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
      />
      <Menu />
    </MemorizePosition>
  );
}
