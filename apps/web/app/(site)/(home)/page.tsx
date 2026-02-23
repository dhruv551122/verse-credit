import HeroBanner from "./_components/heroBanner";
import CategoriesGroup from "./_components/categoriesGroups";
import { BlogsQueryResult, HomePageQueryResult } from "@sanity-types/*";
import NewsBlogs from "./_components/newsBlogs";
import { sanityFetch } from "@/sanity/lib/live";
import { blogsQuery, homePageQuery } from "@/sanity/lib/query";
import { notFound } from "next/navigation";

export const generateMetadata = async () => {
  const { data: homePage } = await sanityFetch<
    NonNullable<HomePageQueryResult>
  >({
    query: homePageQuery,
  });

  if (!homePage) {
    return notFound();
  }

  return {
    title: homePage.seo.seoTitle,
    description: homePage.seo.seoDescription,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DOMAIN_URL}`,
    },
  };
};

const HomePage = async () => {
  const { data: homePage } = await sanityFetch<
    NonNullable<HomePageQueryResult>
  >({
    query: homePageQuery,
  });

  const { data: blogsData } = await sanityFetch<NonNullable<BlogsQueryResult>>({
    query: blogsQuery,
  });

  return (
    <div className="pt-16.75 font-inter">
      <HeroBanner homePage={homePage} blogData={blogsData} />
      <CategoriesGroup homePage={homePage} blogData={blogsData} />
      <NewsBlogs homePage={homePage} />
    </div>
  );
};

export default HomePage;
