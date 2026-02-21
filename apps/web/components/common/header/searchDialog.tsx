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
import { Link, SearchIcon, X } from "lucide-react";
import BlogHeader from "../blogHeader";
import { SanityImage } from "@/sanity/sanityImage";
import {
  ChangeEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { BlogsByTitleSlugResult } from "@sanity-types/*";

const SearchDialog = ({
  isMobile,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [resultBlogs, setResultBlogs] = useState<
    NonNullable<BlogsByTitleSlugResult>
  >([]);
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

  useEffect(() => {
    const fetchData = async () => {
      if (inputText.trim() === "") {
        setResultBlogs([]);
        return;
      }
      try {
        const controller = new AbortController();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogsByTitle?titleSlug=${inputText}`,
          { signal: controller.signal },
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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
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
        <SearchIcon className="text-white duration-300 cursor-pointer hover:text-white/80" />
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={() => {
          setInputText("");
          setResultBlogs([]);
        }}
        showCloseButton={false}
        className={cn(
          "text-tuatara top-0 z-111 md:z-50 h-0 p-0 md:p-6  translate-y-0  backdrop-blur-xs rounded-none shadow-none border-none sm:max-w-none max-w-none  data-[state=open]:h-screen   w-screen  flex justify-center bg-black/50",
          isMobile && "rounded-none",
        )}
      >
        <div
          className={cn(
            "p-4 bg-white -translate-y-full w-full md:rounded-lg shadow-lg md:w-2/3 py-6 lg:w-1/2 md:p-6 max-h-screen md:h-fit md:mt-14 transition-transform ease-in-out duration-300",
            isSearchOpen && "translate-y-0",
          )}
        >
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
                Search articles, topics, or keywords to quickly find what you’re
                looking for.
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
          {resultBlogs.length > 0 ? (
            <div className="flex flex-col w-full gap-4 py-2 overflow-y-scroll md:mt-4 max-h-150 md:min-h-80 md:max-h-80">
              {resultBlogs.map((blog, index) => (
                <DialogClose key={blog._id} asChild>
                  <Link
                    href={`/${blog.category.slug.current}/${blog.slug.current}`}
                    className={cn(
                      "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4",
                      resultBlogs.length - 1 !== index &&
                        "border-b border-gray-300",
                    )}
                  >
                    <BlogHeader
                      category={blog.category.label}
                      title={blog.title}
                      author={blog.author.authorName}
                      date={formatDate(blog.uploadedAt || blog._updatedAt)}
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
