"use client";

import { SanityImage } from "@/sanity/sanityImage";
import {
  BlogCategoriesQueryResult,
  SettingsQueryResult,
} from "@sanity-types/sanity.types";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("./sidebar"), {
  ssr: false,
});

import TopicsDialog from "./topicsDialog";
import SearchDialog from "./searchDialog";

const Header = ({
  data,
  categoriesData,
}: {
  data: NonNullable<SettingsQueryResult>;
  categoriesData: NonNullable<BlogCategoriesQueryResult>;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<number>(0);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isMobileMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }, [isMobileMenuOpen]);

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

  const isMobile = screenSize <= 768;

  return (
    <div className="fixed top-0 left-0 w-full z-100 bg-chathams-blue">
      <div className="flex items-center justify-between p-4 max-width-container md:px-10 text-sandstone font-inter">
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
          <SanityImage
            src={data.headerLogo}
            alt={data.headerLogo.alt}
            width={100}
            height={100}
            className="object-contain"
          />
        </Link>
        {typeof window !== "undefined" && !isMobile && (
          <div className="flex gap-10">
            {data.headerLinks.map((link) => (
              <Link
                href={`${link.url}`}
                key={link._key}
                className="text-white duration-300 hover:text-white/80 "
              >
                {link.label}
              </Link>
            ))}
            {!isMobile && (
              <TopicsDialog
                categoriesData={categoriesData}
                isMobile={isMobile}
              />
            )}
          </div>
        )}
        <div className="flex items-center gap-4">
          <SearchDialog
            isMobile={isMobile}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          {isMobile && (
            <Sidebar
              data={data}
              isSidebarOpen={isMobileMenuOpen}
              setIsSidebarOpen={setIsMobileMenuOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
