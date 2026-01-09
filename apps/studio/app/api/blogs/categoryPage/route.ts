import { NextRequest, NextResponse } from "next/server";
import { sanityFetch } from "studio/sanity/lib/live";
import {
  blogCategoryBySlugQuery,
  blogCategoryPageQuery,
} from "studio/sanity/lib/query";
import {
  BlogCategoryBySlugQueryResult,
  BlogCategoryPageQueryResult,
} from "../../../../../../packages/types/src";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const categorySlug = searchParams.get("categorySlug");

  if (!categorySlug) {
    console.error("Category not found!");
    return new NextResponse("Category not found!", { status: 400 });
  }
  try {
    const {
      data: categoryData,
    }: { data: NonNullable<BlogCategoryBySlugQueryResult> } = await sanityFetch(
      {
        query: blogCategoryBySlugQuery,
        params: { categorySlug: categorySlug },
      }
    );

    const {
      data: categoryPage,
    }: { data: NonNullable<BlogCategoryPageQueryResult> } = await sanityFetch({
      query: blogCategoryPageQuery,
    });

    const data = {
      category: categoryData,
      categoryPage: {
        ...categoryPage,
        otherCategories: categoryPage.otherCategories.filter(
          (category) => category._id !== categoryData._id
        ),
      },
    };
    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Data not found", err);
    return new NextResponse("Data not found!", { status: 400 });
  }
};
