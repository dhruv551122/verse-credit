import { NextRequest, NextResponse } from "next/server";
import { sanityFetch } from "studio/sanity/lib/live";
import { blogBySlugQuery } from "studio/sanity/lib/query";
import { BlogBySlugQueryResult } from "../../../../../packages/types/src";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const categorySlug = searchParams.get("categorySlug");
  const blogSlug = searchParams.get("blogSlug");

  if (!categorySlug || !blogSlug) {
    return NextResponse.json(
      { error: "Missing categorySlug or blogSlug" },
      { status: 400 }
    );
  }

  try {
    const { data }: { data: BlogBySlugQueryResult } = await sanityFetch({
      query: blogBySlugQuery,
      params: { categorySlug, blogSlug },
    });

    if (!data) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
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
      { status: 500 }
    );
  }
}
