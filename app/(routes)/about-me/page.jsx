import AboutMePage from "@/app/components/AboutMe/AboutMePage";
import Menu from "@/app/components/Menu/Menu/Menu";
import MemorizePosition from "@/app/components/Work/MemorizePosition";
import { fetchDocs } from "@/app/lib/content";
import { fetchFeaturedBlurDataUrls } from "@/app/utils/getBase64";

// Use ISR with 1 hour revalidation
export const revalidate = 3600;

export const metadata = {
  title: "About Me",
  description:
    "Learn more about Luigi Simiani, a professional photographer based in Amsterdam. Discover my journey, approach, and passion for photography.",
  openGraph: {
    title: "About Luigi Simiani | Professional Photographer",
    description:
      "Learn more about Luigi Simiani, a professional photographer based in Amsterdam.",
    url: "https://luigisimiani.com/about-me",
  },
};

export default async function AboutMe() {
  const paragraphs = await fetchDocs("about/bio");
  const sources = await fetchDocs("about/film-strip");

  const blurData = await fetchFeaturedBlurDataUrls(sources);

  sources.forEach((source, i) => (source.base64 = blurData[i]));

  return (
    <>
      <MemorizePosition>
        <Menu />
        <AboutMePage paragraphs={paragraphs.reverse()} sources={sources} />
      </MemorizePosition>
    </>
  );
}
