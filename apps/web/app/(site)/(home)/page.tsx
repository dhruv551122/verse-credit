import HeroBanner from "./_components/heroBanner";
import CategoriesGroup from "./_components/categoriesGroups";
import { BlogsQueryResult, HomePageQueryResult } from "@sanity-types/*";
import NewsBlogs from "./_components/newsBlogs";

const HomePage = async () => {
  const homeData = await fetch(`${process.env.BACKEND_URL}/api/home`);
  const homePage: NonNullable<HomePageQueryResult> = await homeData.json();

  const blogsData = await fetch(`${process.env.BACKEND_URL}/api/blogs`);
  const blogsPage: NonNullable<BlogsQueryResult> = await blogsData.json();

  return (
    <div className="mt-16.75 font-inter">
      <HeroBanner homePage={homePage} blogData={blogsPage} />
      <CategoriesGroup homePage={homePage} blogData={blogsPage} />
      <NewsBlogs homePage={homePage}/>
    </div>
  );
};

export default HomePage;
