import { NextResponse } from "next/server";
import { CalculatorCategoriesQueryResult } from "../../../../../packages/types/src";
import { client } from "studio/sanity/lib/client";
import { calculatorCategoriesQuery } from "studio/sanity/lib/query";

export async function GET() {
  try {
    const data = await client.fetch<
      NonNullable<CalculatorCategoriesQueryResult>
    >(calculatorCategoriesQuery);

    if (!data) {
      return NextResponse.json(
        { error: "No result for calculator categories." },
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
