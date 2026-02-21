import { SanityImage } from "@/sanity/sanityImage";
import { SettingsQueryResult } from "@sanity-types/*";
import Link from "next/link";

const Footer = ({ data }: { data: NonNullable<SettingsQueryResult> }) => {
  return (
    <div className="bg-casual-navy">
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
          <div className="flex flex-col gap-2 shrink-0 ">
            <h4 className="text-subtle-white text-[22px] font-medium">
              Follow us on
            </h4>
            <div className="flex gap-4">
              {data.socialMediaLinks.map((link) => (
                <Link
                  key={link.url.label}
                  href={link.url.url}
                  target={link.url.openInNewTab ? "_blank" : "_self"}
                >
                  <SanityImage
                    src={link.logo}
                    alt={link.logo.alt}
                    width={20}
                    height={20}
                    className="object-contain w-auto h-6"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-subtle-white text-[22px] font-medium">
              Quick Links
            </h4>
            <div className="flex flex-col gap-4">
              {data.footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={`/${link.url}`}
                  className="text-subtle-white shrink-0 text-[18px] hover:text-subtle-white/80"
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
