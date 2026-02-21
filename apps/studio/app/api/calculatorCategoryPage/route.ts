import { NextRequest, NextResponse } from "next/server";
import { calculatorCategoryPageQuery } from "studio/sanity/lib/query";
import { CalculatorCategoryPageQueryResult } from "../../../../../packages/types/src";
import { client } from "studio/sanity/lib/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const calculatorSlug = searchParams.get("calculatorSlug");
  try {
    const data = await client.fetch<
      NonNullable<CalculatorCategoryPageQueryResult>
    >(calculatorCategoryPageQuery, { calculatorSlug });

    if (!data) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
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
