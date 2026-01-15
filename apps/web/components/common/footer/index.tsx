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
        <div className="flex gap-20 mt-10">
          <div className="flex flex-col gap-2 ">
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
                    alt={link.logo.asset?.altText || link.url.label}
                    width={20}
                    height={20}
                    className="object-contain h-6 w-auto"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-subtle-white text-[22px] font-medium">
              Quick Links
            </h4>
            <div className="flex gap-4 ">
              {data.footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={`/${link.url}`}
                  className="text-subtle-white text-[18px] hover:text-subtle-white/80"
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
