import ContactPage from "@/app/components/contact/ContactPage";
import Menu from "@/app/components/menu/Menu";
import MemorizePosition from "@/app/components/work/MemorizePosition";
import { fetchDoc } from "@/lib/content";

// Use ISR with 1 hour revalidation
export const revalidate = 3600;

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Luigi Simiani for photography inquiries, collaborations, or bookings. Based in Amsterdam and available for projects worldwide.",
  openGraph: {
    title: "Contact Luigi Simiani | Photography Inquiries",
    description:
      "Get in touch with Luigi Simiani for photography inquiries and collaborations.",
    url: "https://luigisimiani.com/contact",
  },
};

export default async function Contact() {
  const contactInfo = await fetchDoc("contact");

  return (
    <>
      <Menu />
      <MemorizePosition>
        <ContactPage contactInfo={contactInfo} />
      </MemorizePosition>
    </>
  );
}
