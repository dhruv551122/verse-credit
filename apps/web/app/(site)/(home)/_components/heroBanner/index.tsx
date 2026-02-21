import { BlogsQueryResult, HomePageQueryResult } from "@sanity-types/*";
import HeroLeft from "./heroLeft";
import HeroRight from "./heroRight";

const HeroBanner = ({
  homePage,
  blogData,
}: {
  homePage: NonNullable<HomePageQueryResult>;
  blogData: NonNullable<BlogsQueryResult>;
}) => {
  return (
    <div className="max-width-container padding-container">
      <div className="grid gap-8 lg:grid-cols-3 ">
        <div className="lg:col-span-2">
          <HeroLeft title={homePage.heroLeftTitle} blogData={blogData} />
        </div>
        <HeroRight homePage={homePage} />
      </div>
    </div>
  );
};

export default HeroBanner;
