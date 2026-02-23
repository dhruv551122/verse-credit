import { ChevronRight } from "lucide-react";
import Link from "next/link";
import CategoryBlogs from "./_components/categoryBlogs";
import {
  BlogCategoriesQueryResult,
  BlogCategoryPageQueryResult,
} from "@sanity-types/*";
import CategoryPageRight from "./_components/categoryPageRight";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { blogCategoriesQuery, blogCategoryPageQuery } from "@/sanity/lib/query";
import { client } from "@/sanity/lib/client";

export const generateMetadata = async ({
  params,
}: {
  params: { categorySlug: string };
}) => {
  const { categorySlug } = await params;
  const { data: categoryPage } = await sanityFetch<
    NonNullable<BlogCategoryPageQueryResult>
  >({
    query: blogCategoryPageQuery,
    params: { categorySlug },
  });

  if (!categoryPage || !categoryPage.category) {
    return notFound();
  }

  return {
    title: categoryPage.category.label,
    description: categoryPage.seo.seoDescription,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${categoryPage.category.slug}`,
    },
  };
};

const CategoriesPage = async ({
  params,
}: {
  params: { categorySlug: string };
}) => {
  const { categorySlug } = await params;
  const { data: categoryPage } = await sanityFetch<
    NonNullable<BlogCategoryPageQueryResult>
  >({
    query: blogCategoryPageQuery,
    params: { categorySlug },
  });

  if (!categoryPage || !categoryPage.category) {
    return notFound();
  }

  return (
    <div className="pt-16.75 font-inter">
      <div className="py-6! max-width-container padding-container">
        <div className="flex items-center gap-2 text-gray-500">
          <Link href="/" className="duration-300 hover:text-gray-700">
            Home
          </Link>
          <ChevronRight />
          <div className="text-gray-700">{categoryPage.category?.label}</div>
        </div>
      </div>
      <div className="max-width-container padding-container">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:border-r lg:border-gray-300 lg:pr-8 lg:col-span-2">
            <CategoryBlogs
              blogs={categoryPage.blogList}
              title={categoryPage.category.label}
            />
          </div>
          <CategoryPageRight categoryPage={categoryPage} />
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;

export async function generateStaticParams() {
  const categories =
    await client.fetch<NonNullable<BlogCategoriesQueryResult>>(
      blogCategoriesQuery,
    );

  if (!categories || !Array.isArray(categories)) {
    return [];
  }

  return categories.map((category) => ({
    categorySlug: category.slug.current,
  }));
}
