import { NextRequest, NextResponse } from "next/server";
import { sanityFetch } from "studio/sanity/lib/live";
import {
  blogsByCategoryQuery,
  blogsByTitleSlug,
  blogsQuery,
} from "studio/sanity/lib/query";
import { BlogsQueryResult } from "../../../../../packages/types/src";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("categorySlug");
  const titleSlug = searchParams.get("titleSlug");
  const fetchOptions = category
    ? { query: blogsByCategoryQuery, params: { categorySlug: category } }
    : titleSlug
      ? { query: blogsByTitleSlug, params: { titleSlug: titleSlug } }
      : { query: blogsQuery };

  try {
    const { data }: { data: NonNullable<BlogsQueryResult> } =
      await sanityFetch(fetchOptions);

    if (!data) {
      return NextResponse.json({ error: "Blogs not found" }, { status: 404 });
    }
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Sanity fetch failed:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
