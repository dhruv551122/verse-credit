import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/query";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { data } = await sanityFetch({ query: settingsQuery });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json("unable to fetch settings data", {
      status: 501,
    });
  }
};
