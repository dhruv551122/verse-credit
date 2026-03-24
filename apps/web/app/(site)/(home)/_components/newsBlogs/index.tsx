import { HomePageQueryResult } from "@sanity-types/*";
import NewsCard from "./newsCard";
import { SanityImage } from "@/sanity/sanityImage";
import { CarouselItem } from "@/components/ui/carousel";
import BlogCardCarousel from "@/components/common/cardCarousel";
import Title from "@/components/common/title";

const NewsBlogs = ({
  homePage,
}: {
  homePage: NonNullable<HomePageQueryResult>;
}) => {
  return (
    <div className="relative">
      {/* <SanityImage
        src={homePage.newsBackgroundImage}
        alt={homePage.newsBackgroundImage.alt}
        fill
        className="object-cover -z-1"
      /> */}
      <div className="max-width-container padding-container pb-4! md:pb-6!">
        <Title title={homePage.newsTitle} />
      </div>
      <div>
        <BlogCardCarousel>
          {homePage.newsBlogs.map((blog) => (
            <CarouselItem
              key={blog._id}
              className="basis-2/3 sm:basis-2/5 md:basis-2/7 lg:basis-4/13"
            >
              <NewsCard blog={blog} />
            </CarouselItem>
          ))}
        </BlogCardCarousel>
      </div>
    </div>
  );
};

export default NewsBlogs;
