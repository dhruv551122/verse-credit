import FacebookIcon from "@/icons/facebookIcon";
import InstagramIcon from "@/icons/instagramIcon";
import { SanityImage } from "@/sanity/sanityImage";
import { SettingsQueryResult } from "@sanity-types/*";
import { Instagram } from "lucide-react";
import Link from "next/link";

const Footer = ({ data }: { data: NonNullable<SettingsQueryResult> }) => {
  return (
    <div className="bg-casual-navy leading-[115%]">
      <div className="max-width-container padding-container">
        <Link href="/">
          <SanityImage
            src={data.footerLogo}
            alt={data.footerLogo.alt}
            width={100}
            height={100}
            className="object-contain"
          />
        </Link>
        <div className="grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 md:gap-20 ">
          <div className="flex flex-col gap-3 shrink-0 ">
            <h4 className="text-subtle-white text-[22px] font-medium">
              {data.socialMediaLinksTitle}
            </h4>
            <div className="flex items-center gap-4">
              <Link href="https://www.instagram.com/" target="_blank">
                <InstagramIcon className="duration-300 fill-white hover:fill-deep-bright-red" />
              </Link>
              <Link href="https://www.facebook.com/" target="_blank">
                <FacebookIcon className="duration-300 fill-white hover:fill-deep-bright-red" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-subtle-white text-[22px] font-medium">
              {data.footerLinksTitle}
            </h4>
            <div className="flex flex-col gap-3">
              {data.footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={`/${link.url}`}
                  className="text-subtle-white shrink-0 text-[18px] hover:text-deep-bright-red duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
