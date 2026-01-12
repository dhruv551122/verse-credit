import { NextRequest, NextResponse } from "next/server";
import { sanityFetch } from "studio/sanity/lib/live";
import { blogBySlugQuery } from "studio/sanity/lib/query";
import { BlogBySlugQueryResult } from "../../../../../packages/types/src";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const categorySlug = searchParams.get("categorySlug");
  const blogSlug = searchParams.get("blogSlug");

  console.log(categorySlug, blogSlug);
  try {
    const { data }: { data: NonNullable<BlogBySlugQueryResult> } =
      await sanityFetch({
        query: blogBySlugQuery,
        params: { categorySlug: categorySlug, blogSlug: blogSlug },
      });
    console.log(data);
    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-TYpe": "application/json" },
    });
  } catch (error) {
    console.error(error, "Data not found");
    return new NextResponse("Data not found!", { status: 500 });
  }
};
