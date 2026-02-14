import Menu from "@/app/components/menu/Menu";
import HeroSlideshow from "@/app/components/home/HeroSlideshow";
import HomeFlowers from "@/app/components/home/HomeFlowers";
import FeaturedWork from "@/app/components/home/FeaturedWork";
import {
  fetchDoc,
  fetchGalleryById,
  fetchFeaturedGalleriesWithLayout,
} from "@/lib/content";

export const revalidate = 3600;

export default async function Home() {
  const heroData = await fetchDoc("home/hero-slideshow");
  const featuredWorkData = await fetchDoc("home/featured-work");
  const quotesData = await fetchDoc("home/quotes");
  const featuredGalleries = await fetchFeaturedGalleriesWithLayout();

  // Get hero images from gallery references
  const galleryIds = (heroData.galleries as string[]) || [];
  const heroImages: { url: string }[] = [];

  for (const id of galleryIds) {
    const gallery = await fetchGalleryById(id);
    if (gallery) {
      const url = gallery.coverPhoto || gallery.imageUrls?.[0];
      if (url) {
        heroImages.push({ url });
      }
    }
  }

  // Get quotes and featured work title
  const quotes = (quotesData.quotes as { text: string; author?: string }[]) || [];
  const heroTitle = (heroData.heroTitle as string) || "";
  const featuredTitle = (featuredWorkData.title as string) || "Featured Work";

  return (
    <>
      <Menu />
      <HeroSlideshow images={heroImages} heroTitle={heroTitle} />
      <HomeFlowers />
      <FeaturedWork
        galleries={featuredGalleries}
        quotes={quotes}
        title={featuredTitle}
      />
    </>
  );
}
