"use client";

import { SanityImage } from "@/sanity/sanityImage";
import {
  BlogsByTitleSlugResult,
  SettingsQueryResult,
} from "@sanity-types/sanity.types";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar";
import { SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import BlogHeader from "../blogHeader";
import { cn, formatDate } from "@/lib/utils";

const Header = ({ data }: { data: NonNullable<SettingsQueryResult> }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<number>(0);
  const [inputText, setInputText] = useState<string>("");
  const [resultBlogs, setResultBlogs] = useState<
    NonNullable<BlogsByTitleSlugResult>
  >([]);

  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      if (inputText.trim() === "") {
        setResultBlogs([]);
        return;
      }
      try {
        const controller = new AbortController();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?titleSlug=${inputText}`,
          { signal: controller.signal }
        );

        if (!res.ok) return null;

        const blogs: NonNullable<BlogsByTitleSlugResult> = await res.json();
        setResultBlogs(blogs);
      } catch (e) {
        if ((e as DOMException).name !== "AbortError") {
          console.error(e);
        }
      }
    };

    fetchData();
  }, [inputText]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => setInputText(e.target.value), 500);
  };

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
        {screenSize > 768 && (
          <div className="flex gap-10">
            {data.headerLinks.map((link) => (
              <Link
                href={link.url}
                key={link._key}
                className="duration-300 text-white hover:text-white/80 "
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
        <div className="flex items-center">
          <Dialog>
            <DialogTrigger>
              <SearchIcon className="text-white hover:text-white/80  duration-300 cursor-pointer" />
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="text-tuatara top-80 sm:max-w-none w-1/2">
              <DialogHeader>
                <DialogTitle className="text-2xl  font-semibold">
                  Search a Topic
                </DialogTitle>
                <div className="flex gap-2 items-center">
                  <SearchIcon size={30} />
                  <Input
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Write here...."
                  />
                </div>
              </DialogHeader>
              <div className="flex flex-col gap-4 max-h-80 overflow-y-scroll no-scrollbar">
                {resultBlogs.map((blog, index) => (
                  <div
                    className={cn(
                      "flex items-center gap-4 pb-4",
                      resultBlogs.length - 1 !== index &&
                        "border-b border-gray-300"
                    )}
                    key={blog._id}
                  >
                    <BlogHeader
                      category={blog.category.label}
                      title={blog.title}
                      author={blog.author.authorName}
                      date={formatDate(blog.uploadedAt || blog._updatedAt)}
                    />
                    <SanityImage
                      src={blog.heroImage}
                      alt={blog.heroImage.alt}
                      width={120}
                      height={80}
                      className="object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          {screenSize <= 768 && (
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
