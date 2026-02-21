import { NextRequest, NextResponse } from "next/server";
import { blogsByTitleSlug } from "studio/sanity/lib/query";
import { BlogsByTitleSlugResult } from "../../../../../packages/types/src";
import { client } from "studio/sanity/lib/client";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const titleSlug = searchParams.get("titleSlug");
  if (!titleSlug?.trim()) {
    return NextResponse.json([], {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  try {
    const data = await client.fetch<NonNullable<BlogsByTitleSlugResult>>(
      blogsByTitleSlug,
      { titleSlug: titleSlug },
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
