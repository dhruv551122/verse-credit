import { ContactPageQueryResult } from "@sanity-types/*";
import HeroBanner from "./_components/herobanner";
import ContactForm from "./_components/contactForm";
import { sanityFetch } from "@/sanity/lib/live";
import { contactPageQuery } from "@/sanity/lib/query";
import { notFound } from "next/navigation";

export const generateMetadata = async () => {
  const { data: contactPage } = await sanityFetch<
    NonNullable<ContactPageQueryResult>
  >({ query: contactPageQuery });

  if (!contactPage) {
    return notFound();
  }

  return {
    title: contactPage.seo.seoTitle,
    description: contactPage.seo.seoDescription,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/contact-us`,
    },
  };
};

const ContactUs = async () => {
  const { data: contactPage } = await sanityFetch<
    NonNullable<ContactPageQueryResult>
  >({ query: contactPageQuery });

  if (!contactPage) {
    return notFound();
  }

  return (
    <div className="mt-16.5 ">
      <HeroBanner contactPage={contactPage} />
      <ContactForm contactPage={contactPage} />
    </div>
  );
};

export default ContactUs;
