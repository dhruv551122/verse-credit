import { sanityFetch } from "@/sanity/lib/live";
import { blogsByCategoryQuery, blogsQuery } from "@/sanity/lib/query";
import { BlogsQueryResult } from "@sanity-types/index";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const {searchParams} = new URL(req.url)

  const category = searchParams.get('categorySlug')
  const fetchOptions = category ? { query:  blogsByCategoryQuery,  params: {categorySlug: category} } : { query: blogsQuery}

  try {
    const { data }: {data: NonNullable<BlogsQueryResult>} = await sanityFetch(fetchOptions);

    if (!data) {
      return new NextResponse("Data not found", { status: 400 });
    }

    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Unable to fetch data");
    return new NextResponse("Unable to fetch data", { status: 500 });
  }
};
