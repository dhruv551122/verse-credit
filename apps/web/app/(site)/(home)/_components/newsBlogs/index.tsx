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
            <div
              key={blog._id}
              className="min-w-60 max-w-60 sm:max-w-80 sm:min-w-80 "
            >
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
