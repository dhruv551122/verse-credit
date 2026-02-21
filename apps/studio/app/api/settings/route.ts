import { NextResponse } from "next/server";
import { sanityFetch } from "studio/sanity/lib/live";
import { settingsQuery } from "studio/sanity/lib/query";
import { SettingsQueryResult } from "../../../../../packages/types/src";

export const GET = async () => {
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
