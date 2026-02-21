import { NextRequest, NextResponse } from "next/server";
import { sanityFetch } from "studio/sanity/lib/live";
import {
  calculatorBySlugQuery,
  calculatorByCategoryQuery,
} from "studio/sanity/lib/query";
import {
  CalculatorByCategoryQueryResult,
  CalculatorBySlugQueryResult,
} from "../../../../../packages/types/src";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const categorySlug = searchParams.get("categorySlug");
  const calculatorSlug = searchParams.get("calculatorSlug");

  try {
    const { data } = await sanityFetch<
      NonNullable<CalculatorByCategoryQueryResult | CalculatorBySlugQueryResult>
    >({
      query: calculatorSlug ? calculatorBySlugQuery : calculatorByCategoryQuery,
      params: categorySlug ? { categorySlug } : { calculatorSlug },
    });

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
