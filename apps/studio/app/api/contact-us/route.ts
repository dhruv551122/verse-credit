import { NextResponse } from "next/server";
import { contactPageQuery } from "studio/sanity/lib/query";
import { ContactPageQueryResult } from "../../../../../packages/types/src";
import { client } from "studio/sanity/lib/client";

export const GET = async () => {
  try {
    const data =
      await client.fetch<NonNullable<ContactPageQueryResult>>(contactPageQuery);
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
