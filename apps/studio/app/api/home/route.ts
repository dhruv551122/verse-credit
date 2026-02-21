import { NextResponse } from "next/server";
import { HomePageQueryResult } from "../../../../../packages/types/src";
import { homePageQuery } from "studio/sanity/lib/query";
import { client } from "studio/sanity/lib/client";

export const GET = async () => {
  try {
    const data =
      await client.fetch<NonNullable<HomePageQueryResult>>(homePageQuery);

    if (!data) {
      return new NextResponse("Data not found", { status: 400 });
    }
    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error, "Unable fetch data");

    return new NextResponse("Unable to fetch Data", { status: 500 });
  }
};
