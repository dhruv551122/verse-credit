import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { URLSearchParams } from "url";
import CategoryBlogs from "./_components/categoryBlogs";
import {
  BlogCategoriesQueryResult,
  BlogCategoryBySlugQueryResult,
  BlogCategoryPageQueryResult,
  BlogsByCategoryQueryResult,
} from "@sanity-types/*";
import CategoryPageRight from "./_components/categoryPageRight";

const CategoriesPage = async ({
  params,
}: {
  params: { categorySlug: string };
}) => {
  const param = await params;
  const searchParams = new URLSearchParams(param).toString();
  const blogsData = await fetch(
    `${process.env.BACKEND_URL}/api/blogs?${searchParams}`
  );

  const categoryPageData = await fetch(
    `${process.env.BACKEND_URL}/api/blogs/categoryPage?${searchParams}`
  );

  const categoryPage: NonNullable<{category: NonNullable<BlogCategoryBySlugQueryResult>, categoryPage: NonNullable<BlogCategoryPageQueryResult>
  }> = await categoryPageData.json()
  
  const blogs: NonNullable<BlogsByCategoryQueryResult> = await blogsData.json();

  
  return (
    <div className="mt-16.75 font-inter">
      <div className="py-6! max-width-container padding-container">
        <div className="flex items-center gap-2 text-gray-500">
          <Link href="/" className="duration-300 hover:text-gray-700">
            Home
          </Link>
          <ChevronRight />
          <div className="text-gray-700">{categoryPage.category.label}</div>
        </div>
      </div>
      <div className="max-width-container padding-container">
        <div className="grid grid-cols-3 ">
          <div className="col-span-2 pr-8 border-r border-gray-300">
            <CategoryBlogs blogs={blogs} title={categoryPage.category.label} />
          </div>
          <CategoryPageRight categories={categoryPage.categoryPage.otherCategories} />
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
