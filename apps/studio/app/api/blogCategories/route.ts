import { NextResponse } from "next/server";
import { blogCategoriesQuery } from "studio/sanity/lib/query";
import { BlogCategoriesQueryResult } from "../../../../../packages/types/src";
import { client } from "studio/sanity/lib/client";

export const GET = async () => {
  try {
    const data =
      await client.fetch<NonNullable<BlogCategoriesQueryResult>>(
        blogCategoriesQuery,
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
