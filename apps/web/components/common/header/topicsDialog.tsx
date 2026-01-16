import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { BlogCategoriesQueryResult } from "@sanity-types/*";
import { X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const TopicsDialog = ({
  isMobile,
  categoriesData,
}: {
  isMobile: boolean;
  categoriesData: NonNullable<BlogCategoriesQueryResult>;
}) => {
  const [isTopicsOpen, setIsTopicsOpen] = useState<boolean>(false);
  const [isTopicsMounted, setIsTopicsMounted] = useState<boolean>(false);

  const topicsDialogTimeRef = useRef<NodeJS.Timeout>(undefined);

  if (typeof document !== "undefined") {
    if (isTopicsMounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
  if (isMobile) {
    setIsTopicsMounted(false);
  }

  if (topicsDialogTimeRef.current) {
    clearTimeout(topicsDialogTimeRef.current);
  }

  if (isTopicsMounted) {
    topicsDialogTimeRef.current = setTimeout(() => setIsTopicsOpen(true), 10);
  } else {
    topicsDialogTimeRef.current = setTimeout(() => setIsTopicsOpen(false));
  }

  return (
    <Dialog
      onOpenChange={setIsTopicsMounted}
      open={isTopicsMounted}
      modal={false}
    >
      <DialogTrigger className="text-white duration-300 cursor-pointer hover:text-white/80">
        Topics
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "text-tuatara top-0 z-50 h-0 translate-y-0 backdrop-blur-xs rounded-none shadow-none border-none sm:max-w-none max-w-none  data-[state=open]:h-screen   w-screen  flex justify-center bg-black/50 ",
          isMobile && "rounded-none"
        )}
      >
        <div
          className={cn(
            "p-4 bg-white rounded-lg shadow-lg md:w-2/3 lg:w-1/2 md:p-6 h-fit mt-14 -translate-y-full duration-300",
            isTopicsOpen && "translate-y-0"
          )}
        >
          <DialogHeader className="gap-4 text-left h-fit">
            <div className="pb-2 border-b border-gray-300">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-semibold text-chathams-blue">
                  All Topics
                </DialogTitle>
                <DialogClose className="cursor-pointer" asChild>
                  <X />
                </DialogClose>
              </div>

              <DialogDescription className="text-gray-500">
                Explore every topic available across the site.
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 py-2 mt-4 ">
            {categoriesData.map((category, index) => (
              <DialogClose key={category._id} asChild>
                <Link
                  href={`/${category.slug.current}`}
                  className="flex flex-col sm:flex-row sm:items-center hover:text-chathams-blue justify-between gap-4"
                >
                  {category.label}
                </Link>
              </DialogClose>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopicsDialog;
