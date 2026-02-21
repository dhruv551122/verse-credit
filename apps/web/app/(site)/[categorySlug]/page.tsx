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
import { notFound } from "next/navigation";

const CategoriesPage = async ({
  params,
}: {
  params: { categorySlug: string };
}) => {
  const param = await params;
  const searchParams = new URLSearchParams(param).toString();
  const blogsData = await fetch(
    `${process.env.BACKEND_URL}/api/blogs?${searchParams}`,
  );

  const blogs: NonNullable<BlogsByCategoryQueryResult> = await blogsData.json();
  let categoryPage: NonNullable<{
    category: NonNullable<BlogCategoryBySlugQueryResult>;
    categoryPage: NonNullable<BlogCategoryPageQueryResult>;
  }>;
  try {
    const categoryPageData = await fetch(
      `${process.env.BACKEND_URL}/api/blogs/categoryPage?${searchParams}`,
    );

    categoryPage = await categoryPageData.json();
  } catch (error: unknown) {
    console.log(error);
    return notFound();
  }

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
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:border-r lg:border-gray-300 lg:pr-8 lg:col-span-2">
            <CategoryBlogs blogs={blogs} title={categoryPage.category.label} />
          </div>
          <CategoryPageRight categoryPage={categoryPage.categoryPage} />
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/blogCategoriesByClient`,
    { cache: "force-cache" },
  );

  if (!res.ok) return [];
  const categories: NonNullable<BlogCategoriesQueryResult> = await res.json();

  if (!categories || !Array.isArray(categories)) {
    return [];
  }

  return categories.map((category) => ({
    categorySlug: category.slug.current,
  }));
}
