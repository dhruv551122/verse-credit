import { NextRequest, NextResponse } from "next/server";
import { BlogCategoryPageQueryResult } from "../../../../../packages/types/src";
import { blogCategoryPageQuery } from "studio/sanity/lib/query";
import { client } from "studio/sanity/lib/client";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("categorySlug");

  if (!category) {
    return new NextResponse("Missing category slug!", {
      status: 402,
    });
  }

  try {
    const data = await client.fetch<NonNullable<BlogCategoryPageQueryResult>>(
      blogCategoryPageQuery,
      { categorySlug: category },
    );

    if (!data) {
      return new NextResponse(
        "Data not found, might be provided category slug is wrong!",
        { status: 400 },
      );
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
