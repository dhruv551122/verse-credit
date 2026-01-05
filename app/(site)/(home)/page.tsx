import { sanityFetch } from "@/sanity/lib/live";
import { blogsQuery, homePageQuery } from "@/sanity/lib/query";
import {
  BlogsQueryResult,
  HomePageQueryResult,
} from "@sanity-types/sanity.types";
import HeroBanner from "./_components/heroBanner";
import CategoriesGroup from "./_components/categoriesGroups";

const HomePage = async () => {
  const { data: homePage }: { data: NonNullable<HomePageQueryResult> } =
    await sanityFetch({
      query: homePageQuery,
    });

  const { data: blogData }: { data: NonNullable<BlogsQueryResult> } =
    await sanityFetch({
      query: blogsQuery,
    });
  return (
    <div className="mt-[67px] font-inter">
      <HeroBanner homePage={homePage} blogData={blogData} />
      <CategoriesGroup homePage={homePage} blogData={blogData} />
    </div>
  );
};

export default HomePage;
