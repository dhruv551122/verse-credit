import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/lib/query";
import { HomePageQueryResult } from "@sanity-types/index";
import { NextResponse } from "next/server";

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
