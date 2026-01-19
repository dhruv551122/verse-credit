import { NextRequest, NextResponse } from "next/server";
import { sanityFetch } from "studio/sanity/lib/live";
import { contactPageQuery } from "studio/sanity/lib/query";
import { ContactPageQueryResult } from "../../../../../packages/types/src";

export const GET = async (req: NextRequest) => {
  try {
    const { data }: { data: NonNullable<ContactPageQueryResult> } =
      await sanityFetch({ query: contactPageQuery });
    console.log(data);
    if (!data) {
      return new NextResponse("Data not found", { status: 401 });
    }
    return NextResponse.json(data, {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error, "Error fetching data");
    return new NextResponse("Error fetching data", { status: 501 });
  }
};
