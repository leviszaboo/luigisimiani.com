import Menu from "../components/Menu/Menu/Menu.jsx";
import HeroSlideshow from "../components/Home/HeroSlideshow/HeroSlideshow.jsx";
import HomeFlowers from "../components/Home/Flowers/HomeFlowers.jsx";
import FeaturedWork from "../components/Home/FeaturedWork/FeaturedWork.jsx";
import {
  fetchDoc,
  fetchGalleryById,
  fetchFeaturedGalleriesWithLayout,
} from "@/app/lib/content";

export const revalidate = 3600;

export default async function Home() {
  const heroData = await fetchDoc("home/hero-slideshow");
  const featuredWorkData = await fetchDoc("home/featured-work");
  const quotesData = await fetchDoc("home/quotes");
  const featuredGalleries = await fetchFeaturedGalleriesWithLayout();

  // Get hero images from gallery references
  const galleryIds = heroData.galleries || [];
  const heroImages = [];

  for (const id of galleryIds) {
    const gallery = await fetchGalleryById(id);
    if (gallery) {
      heroImages.push({
        url: gallery.coverPhoto || gallery.imageUrls?.[0],
        galleryId: gallery.id,
      });
    }
  }

  // Get quotes and featured work title
  const quotes = quotesData.quotes || [];
  const heroTitle = heroData.heroTitle || "";
  const featuredTitle = featuredWorkData.title || "Featured Work";

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
