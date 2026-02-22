import { NextResponse } from "next/server";
import { calculatorPageQuery } from "studio/sanity/lib/query";
import { client } from "studio/sanity/lib/client";
import { CalculatorPageQueryResult } from "../../../../../packages/types/src";

export async function GET() {
  try {
    const data =
      await client.fetch<NonNullable<CalculatorPageQueryResult>>(
        calculatorPageQuery,
      );

    if (!data) {
      return NextResponse.json(
        { error: "Calculator page is not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Sanity fetch failed:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
