import AboutMePage from "@/app/components/about-me/AboutMePage";
import Menu from "@/app/components/menu/Menu";
import MemorizePosition from "@/app/components/work/MemorizePosition";
import { fetchDocs } from "@/lib/content";
import { fetchFeaturedBlurDataUrls } from "@/lib/getBase64";

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

interface Paragraph {
  value: string;
  highlightWords?: string[];
}

interface Source {
  url: string;
  base64?: string;
}

export default async function AboutMe() {
  const paragraphs = (await fetchDocs("about/bio")) as unknown as Paragraph[];
  const sources = (await fetchDocs("about/film-strip")) as unknown as Source[];

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
