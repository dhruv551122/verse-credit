"use client";

import { SanityImage } from "@/sanity/sanityImage";
import {
  BlogCategoriesQueryResult,
  BlogsQueryResult,
  CalculatorsQueryResult,
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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import CalculatorsDialog from "./calculatorsDialog";

const Header = ({
  data,
  categoriesData,
  blogs,
  calculatorsData,
}: {
  data: NonNullable<SettingsQueryResult>;
  categoriesData: NonNullable<BlogCategoriesQueryResult>;
  blogs: NonNullable<BlogsQueryResult>;
  calculatorsData: NonNullable<CalculatorsQueryResult>;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<number>(0);
  const pathname = usePathname();
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
    <div className="fixed top-0 left-0 w-full z-100 bg-casual-navy">
      <div className="flex items-center justify-between p-4 max-width-container md:px-10 text-sandstone ">
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
                href={link.url}
                key={link._key}
                className={cn(
                  "text-white duration-300 hover:text-deep-bright-red",
                  pathname.includes(link.url) && "text-deep-bright-red",
                )}
              >
                {link.label}
              </Link>
            ))}
            {!isMobile && (
              <CalculatorsDialog
                isMobile={isMobile}
                CalculatorsData={calculatorsData}
              />
            )}
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
            blogs={blogs}
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
