import { HomePageQueryResult } from "@sanity-types/*";
import NewsCard from "./newsCard";
import { SanityImage } from "@/sanity/sanityImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BlogCardCarousel from "@/components/common/blogCardCarousel";
import Link from "next/link";

const NewsBlogs = ({
  homePage,
}: {
  homePage: NonNullable<HomePageQueryResult>;
}) => {
  return (
    <div className="relative">
      <SanityImage
        src={homePage.newsBackgroundImage}
        alt={homePage.newsBackgroundImage.alt}
        fill
        className="object-cover -z-1"
      />
      <div className="max-width-container padding-container">
        <h2 className="pb-4 text-3xl font-semibold text-gray-200">
          {homePage.newsTitle}
        </h2>
      </div>
      <div>
        <BlogCardCarousel>
          {homePage.newsBlogs.map((blog) => (
            <div key={blog._id} className="min-w-60 max-w-60 sm:max-w-80 sm:min-w-80 ">
              <CarouselItem>
                <NewsCard blog={blog} />
              </CarouselItem>
            </div>
          ))}
        </BlogCardCarousel>
      </div>
    </div>
  );
};

export default NewsBlogs;
