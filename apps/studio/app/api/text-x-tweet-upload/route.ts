import { NextRequest, NextResponse } from "next/server";
     
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (
      req.headers.get("x-sanity-secret") !== process.env.SANITY_WEBHOOK_SECRET
    ) {
      return NextResponse.json("Unauthorized access!", { status: 401 });
    }

    if (!body) {
      return NextResponse.json(
        { success: false, message: "Body is missing" },
        { status: 401 },
      );
    }

    if (!body.title) {
      return NextResponse.json(
        { success: false, message: "Title is missing" },
        { status: 401 },
      );
    }
    if (!body.description) {
      return NextResponse.json(
        { success: false, message: "Description is missing" },
        { status: 401 },
      );
    }
    if (!body.slug) {
      return NextResponse.json(
        { success: false, message: "Slug is missing" },
        { status: 401 },
      );
    }
    if (!body.category) {
      return NextResponse.json(
        { success: false, message: "Category is missing" },
        { status: 401 },
      );
    }

    if (body.publishedAt && new Date(body.publishedAt) > new Date()) {
      return NextResponse.json({ scheduled: true });
    }

    const blogUrl = `${process.env.FRONTEND_URL}/${body.category.slug.current}/${body.slug.current}`;
    const description =
      body.description.length > 150
        ? body.description.slice(0, 150) + "..."
        : body.description;

    const text = [
      "New blog is live! 🚀",
      "",
      body.title,
      "",
      description,
      "",
      "Read here 👇",
      blogUrl,
      "",
      `#${body.category.label.replaceAll(" ", "")} #Investing #StockMarket #InvestSmart #MarketTrends`,
    ].join("\n");

    return NextResponse.json(
      { success: "true", text },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error, "Something went wrong");
    return NextResponse.json("Something went wrong", {
      status: 500,
    });
  }
}
