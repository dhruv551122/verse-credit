import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn, formatDate } from "@/lib/utils";
import { SearchIcon, X } from "lucide-react";
import BlogHeader from "../blogHeader";
import { SanityImage } from "@/sanity/sanityImage";
import {
  ChangeEvent,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BlogsByTitleSlugResult, BlogsQueryResult } from "@sanity-types/*";
import Link from "next/link";

const SearchDialog = ({
  isMobile,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  blogs,
}: {
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<SetStateAction<boolean>>;
  blogs: NonNullable<BlogsQueryResult>;
}) => {
  const [inputText, setInputText] = useState<string>("");
  const [isSearchMounted, setIsSearchMounted] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const searchDialogTimeRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isMobileMenuOpen || isSearchMounted) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }, [isMobileMenuOpen, isSearchMounted]);

  useEffect(() => {
    if (searchDialogTimeRef.current) {
      clearTimeout(searchDialogTimeRef.current);
    }

    if (isSearchMounted) {
      searchDialogTimeRef.current = setTimeout(() => setIsSearchOpen(true), 10);
    } else {
      searchDialogTimeRef.current = setTimeout(() => setIsSearchOpen(false));
    }
  }, [isSearchMounted]);

  const searchResult: NonNullable<BlogsQueryResult> = useMemo(() => {
    const searchQuery = inputText.trim().toLowerCase();
    if (!searchQuery) {
      return [];
    }
    const result = blogs.filter((blog) =>
      blog.title.toLowerCase().match(searchQuery),
    );

    return result;
  }, [inputText, blogs]);
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!value.trim()) {
      setInputText("");
      return;
    }

    timerRef.current = setTimeout(() => setInputText(e.target.value), 300);
  };

  return (
    <Dialog
      onOpenChange={setIsSearchMounted}
      open={isSearchMounted}
      modal={false}
    >
      <DialogTrigger
        onClick={() => {
          if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
          }
        }}
      >
        <SearchIcon className="text-white duration-300 cursor-pointer hover:text-deep-bright-red" />
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={() => {
          setInputText("");
        }}
        showCloseButton={false}
        className={cn(
          "text-tuatara top-0 z-111 md:z-50 h-0 p-0 md:p-6  translate-y-0  backdrop-blur-xs rounded-none shadow-none border-none sm:max-w-none max-w-none data-[state=open]:h-screen w-screen flex justify-center bg-black/50",
          isMobile && "rounded-none",
        )}
      >
        <div
          className={cn(
            "p-4 bg-white -translate-y-full w-full md:rounded-lg shadow-lg md:w-2/3 py-6 lg:w-1/2 md:p-6 max-h-screen md:h-fit md:mt-14 transition-transform ease-in-out duration-300",
            isSearchOpen && "translate-y-0",
          )}
        >
          <DialogHeader className="gap-4 mb-4 text-left h-fit">
            <div className="pb-2">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-semibold text-deep-bright-red">
                  Search a Topic
                </DialogTitle>
                <DialogClose className="cursor-pointer" asChild>
                  <X className="duration-300 hover:text-deep-bright-red" />
                </DialogClose>
              </div>

              <DialogDescription className="text-gray-500">
                Search articles, topics, or keywords to quickly find what you’re
                looking for.
              </DialogDescription>
            </div>
            <div className="relative">
              <SearchIcon
                size={isMobile ? 18 : 20}
                className="absolute text-gray-400 -translate-y-1/2 left-2 top-1/2"
              />
              <Input
                onChange={(e) => handleInputChange(e)}
                placeholder="Write here...."
                className="shadow-none outline-none p-0 text-base md:text-[18px]! pl-8 py-3"
              />
            </div>
          </DialogHeader>
          {searchResult.length > 0 ? (
            <div className="flex flex-col w-full gap-4 pb-10 overflow-y-scroll custom-scrollbar md:mt-4 max-h-120 md:min-h-80 md:max-h-80 no-scrollbar">
              {searchResult.map((blog, index) => (
                <DialogClose key={blog._id} asChild>
                  <Link
                    key={blog._id}
                    href={`/${blog.category.slug.current}/${blog.slug.current}`}
                    className={cn(
                      "flex flex-col sm:flex-row sm:items-center group justify-between gap-4 pb-4",
                      searchResult.length - 1 !== index &&
                        "border-b border-gray-300",
                    )}
                  >
                    <BlogHeader
                      category={blog.category.label}
                      title={blog.title}
                      author={blog.author.authorName}
                      date={formatDate(blog.uplodedAt || blog._updatedAt)}
                      headingClassname="text-sm"
                      titleClassname="md:text-[18px] group-hover:text-deep-bright-red text-base"
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
          ) : (
            <div className="h-full mt-4 md:max-h-80 md:min-h-80">
              <p>No match found.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
