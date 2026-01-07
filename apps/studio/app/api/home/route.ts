import { NextResponse } from "next/server";
import { HomePageQueryResult } from "../../../../../packages/types/src";
import { homePageQuery } from "studio/sanity/lib/query";
import { sanityFetch } from "studio/sanity/lib/live";

export const GET = async (req: Request) => {
  try {
    const { data }: { data: NonNullable<HomePageQueryResult> } =
      await sanityFetch({ query: homePageQuery });

    if (!data) {
      return new NextResponse("Data not found", { status: 400 });
    }
    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Unable fetch data");

    return new NextResponse("Unable to fetch Data", { status: 500 });
  }
};
