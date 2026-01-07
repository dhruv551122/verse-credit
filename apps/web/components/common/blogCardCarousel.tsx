import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BlogsQueryResult } from "@sanity-types/sanity.types";
import Link from "next/link";
import { ReactNode } from "react";

const BlogCardCarousel = ({
 
  children,
}: {
  
  children: ReactNode;
}) => {
  // if (blogs.length === 0) {
  //   return (
  //     <div className="max-width-container px-4 md:px-10 pb-4 md:pb-10 lg:pb-16">
  //       No blog found
  //     </div>
  //   );
  // }
  return (
    <div className="pl-4 md:pl-10 2xl:w-[calc(100%-(100%-1440px)/2)] 2xl:ml-auto pb-4 md:pb-10 lg:pb-16">
      <Carousel className="overflow-hidden left-0">
        <CarouselContent>{children}</CarouselContent>
        <div className="flex items-center justify-center gap-6 mt-6">
          <CarouselPrevious className="relative left-0 cursor-pointer translate-0" />
          <CarouselNext className="relative right-0 cursor-pointer translate-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default BlogCardCarousel;
