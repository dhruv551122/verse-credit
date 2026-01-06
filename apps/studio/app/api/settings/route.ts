import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/query";
import { SettingsQueryResult } from "@sanity-types/index";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { data }: { data: NonNullable<SettingsQueryResult> } =
      await sanityFetch({ query: settingsQuery });
    if (!data) {
      return new NextResponse("Data not found.", { status: 400 });
    }
    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error, "Unable to fetch data.");

    return new NextResponse("Unable to fetch data.", { status: 500 });
  }
};
