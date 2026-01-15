"use client";

import { SanityImage } from "@/sanity/sanityImage";
import {
  BlogsByTitleSlugResult,
  SettingsQueryResult,
} from "@sanity-types/sanity.types";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar";
import { SearchIcon, X } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import BlogHeader from "../blogHeader";
import { cn, formatDate } from "@/lib/utils";

const Header = ({ data }: { data: NonNullable<SettingsQueryResult> }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<number>(0);
  const [inputText, setInputText] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
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

    timerRef.current = setTimeout(() => setInputText(e.target.value), 300);
  };

  const isMobile = screenSize <= 768;

  return (
    <div className="fixed top-0 left-0 w-full z-100 bg-chathams-blue">
      <div className="flex items-center justify-between p-4 max-width-container md:px-10 text-Sandstone font-inter">
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
                href={`/${link.url}`}
                key={link._key}
                className="text-white duration-300 hover:text-white/80 "
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
        <div className="flex items-center gap-4">
          <Dialog
            onOpenChange={setIsDialogOpen}
            open={isDialogOpen}
            modal={false}
          >
            <DialogTrigger>
              <SearchIcon className="text-white duration-300 cursor-pointer hover:text-white/80" />
            </DialogTrigger>
            <DialogContent
              onCloseAutoFocus={() => {
                setInputText("");
                setResultBlogs([]);
              }}
              showCloseButton={false}
              className={cn(
                "text-tuatara top-0 z-50 h-0  translate-y-0  backdrop-blur-xs rounded-none shadow-none border-none sm:max-w-none max-w-none  data-[state=open]:h-screen   w-screen  flex justify-center bg-black/50",
                isMobile && "rounded-none"
              )}
            >
              <div className="p-4 bg-white rounded-lg shadow-lg md:w-2/3 lg:w-1/2 md:p-6 h-fit mt-18">
                <DialogHeader className="gap-4 text-left h-fit">
                  <div className="pb-2 border-b border-gray-300">
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-2xl font-semibold text-chathams-blue">
                        Search a Topic
                      </DialogTitle>
                      <DialogClose className="cursor-pointer" asChild>
                        <X />
                      </DialogClose>
                    </div>

                    <DialogDescription className="text-gray-500">
                      Search articles, topics, or keywords to quickly find what
                      you’re looking for.
                    </DialogDescription>
                  </div>
                  <div className="flex items-center gap-2 border-b border-gray-300">
                    <SearchIcon size={isMobile ? 20 : 30} />
                    <Input
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Write here...."
                      className="border-none outline-none ring-0 focus-visible:ring-0 p-0 text-base md:text-[20px]!"
                    />
                  </div>
                </DialogHeader>
                {resultBlogs.length > 0 ?
                  <div className="flex flex-col h-full gap-4 py-2 mt-4 overflow-y-scroll md:min-h-80 md:max-h-80">
                    {resultBlogs.map((blog, index) => (
                      <DialogClose key={blog._id} asChild>
                        <Link
                          href={`/${blog.category.slug.current}/${blog.slug.current}`}
                          className={cn(
                            "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4",
                            resultBlogs.length - 1 !== index &&
                              "border-b border-gray-300"
                          )}
                        >
                          <BlogHeader
                            category={blog.category.label}
                            title={blog.title}
                            author={blog.author.authorName}
                            date={formatDate(
                              blog.uploadedAt || blog._updatedAt
                            )}
                            titleClassname="md:text-[22px] text-[18px]"
                          />
                          <SanityImage
                            src={blog.heroImage}
                            alt={blog.heroImage.alt}
                            width={120}
                            height={80}
                            className="object-cover rounded-xl"
                          />
                        </Link>
                      </DialogClose>
                    ))}
                  </div>
                : <div className="h-full mt-4 md:max-h-80 md:min-h-80">
                    <p>No match found.</p>
                  </div>
                }
              </div>
            </DialogContent>
          </Dialog>
          {typeof window !== "undefined" && isMobile && (
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
