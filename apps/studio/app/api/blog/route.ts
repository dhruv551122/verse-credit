import { NextRequest, NextResponse } from "next/server";
import { blogBySlugQuery } from "studio/sanity/lib/query";
import { BlogBySlugQueryResult } from "../../../../../packages/types/src";
import { client } from "studio/sanity/lib/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const blogSlug = searchParams.get("blogSlug");

  if (!blogSlug) {
    return NextResponse.json({ error: "Missing blog slug!" }, { status: 400 });
  }

  try {
    const data = await client.fetch<NonNullable<BlogBySlugQueryResult>>(
      blogBySlugQuery,
      { blogSlug },
    );

    if (!data) {
      return NextResponse.json(
        { error: "Blog not found, might be provided blog slug is wrong." },
        { status: 404 },
      );
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
}
