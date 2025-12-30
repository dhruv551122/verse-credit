import { sanityFetch } from "@/sanity/lib/live";
import { calculatorQuery } from "@/sanity/lib/query";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { data } = await sanityFetch({ query: calculatorQuery });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json("unable to fetch calculator data", {
      status: 501,
    });
  }
};
