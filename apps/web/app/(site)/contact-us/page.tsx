import { ContactPageQueryResult } from "@sanity-types/*";
import HeroBanner from "./_components/herobanner";
import ContactForm from "./_components/contactForm";

const ContactUs = async () => {
  const data = await fetch(`${process.env.BACKEND_URL}/api/contact-us`);
  const contactPage: NonNullable<ContactPageQueryResult> = await data.json();
  return (
    <div className="mt-16.5 ">
      <HeroBanner contactPage={contactPage} />
      <ContactForm contactPage={contactPage} />
    </div>
  );
};

export default ContactUs;
