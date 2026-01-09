"use client";

import { SanityImage } from "@/sanity/sanityImage";
import { SettingsQueryResult } from "@sanity-types/sanity.types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";

const Header = ({ data }: { data: NonNullable<SettingsQueryResult> }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [screnSize, setScreenSize] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full z-100 bg-chathams-blue">
      <div className="flex items-center justify-between max-width-container p-4 md:px-10 text-Sandstone font-inter">
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
          <SanityImage
            src={data.headerLogo}
            alt={data.headerLogo.alt}
            width={100}
            height={100}
            className="object-contain"
          />
        </Link>
        {screnSize > 768 ? (
          <div className="flex gap-10">
            {data.headerLinks.map((link) => (
              <Link
                href={link.url}
                key={link._key}
                className="duration-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : (
          <Sidebar
            data={data}
            isSidebarOpen={isMobileMenuOpen}
            setIsSidebarOpen={setIsMobileMenuOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
