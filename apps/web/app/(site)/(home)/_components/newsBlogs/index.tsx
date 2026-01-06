import { HomePageQueryResult } from "@sanity-types/*";
import NewsCard from "./newsCard";
import { SanityImage } from "@/sanity/sanityImage";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const NewsBlogs = ({
  homePage,
}: {
  homePage: NonNullable<HomePageQueryResult>;
}) => {
  return (
    <div className="relative">
        <SanityImage src={homePage.newsBackgroundImage} alt={homePage.newsBackgroundImage.alt} fill className="object-cover -z-1"/>
      <div className="max-width-container padding-container">
        <h2 className="pb-4 text-3xl font-semibold text-gray-200">{homePage.newsTitle}</h2>
        <div>
          <Carousel>
              <CarouselContent>
                {homePage.newsBlogs
                  .map((blog) => (
                    <CarouselItem
                      key={blog._id}
                      className="flex flex-col gap-6 basis-auto pl-0 ml-4"
                    >
                      <NewsCard blog={blog}/>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <div className="flex items-center justify-center gap-6 mt-6">
                <CarouselPrevious className="relative left-0 cursor-pointer translate-0" />
                <CarouselNext className="relative right-0 cursor-pointer translate-0" />
              </div>
            </Carousel>
        </div>
      </div>
    </div>
  );
};

export default NewsBlogs;
