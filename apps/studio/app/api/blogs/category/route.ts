import { NextRequest, NextResponse } from "next/server";
import { sanityFetch } from "studio/sanity/lib/live";
import {
  BlogCategoriesQueryResult,
  BlogCategoryBySlugQueryResult,
} from "../../../../../../packages/types/src";
import {
  blogCategoriesQuery,
  blogCategoryBySlugQuery,
} from "studio/sanity/lib/query";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("categorySlug");
  const fetchOptions = category
    ? { query: blogCategoryBySlugQuery, params: { categorySlug: category } }
    : { query: blogCategoriesQuery };
  try {
    const {
      data,
    }: {
      data:
        | NonNullable<BlogCategoriesQueryResult>
        | NonNullable<BlogCategoryBySlugQueryResult>;
    } = await sanityFetch(fetchOptions);

    if (!data) {
      return new NextResponse("Data not found", { status: 400 });
    }

    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error(error, "Unable to fetch data");
    return new NextResponse("Unable to fetch data", { status: 500 });
  }
};
