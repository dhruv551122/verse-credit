import { NextResponse } from "next/server";
import { blogsQuery } from "studio/sanity/lib/query";
import { BlogsQueryResult } from "../../../../../packages/types/src";
import { client } from "studio/sanity/lib/client";

export const GET = async () => {
  try {
    const data = await client.fetch<NonNullable<BlogsQueryResult>>(blogsQuery);

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
