import { NextRequest, NextResponse } from "next/server";
import { blogsByCategoryQuery } from "studio/sanity/lib/query";
import { BlogsByCategoryQueryResult } from "../../../../../packages/types/src";
import { client } from "studio/sanity/lib/client";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("categorySlug");

  try {
    const data = await client.fetch<NonNullable<BlogsByCategoryQueryResult>>(
      blogsByCategoryQuery,
      { categorySlug: category },
    );

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
