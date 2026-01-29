import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log(body);

  if (!body) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }

  if (body.publishedAt && new Date(body.publishedAt) > new Date()) {
    return NextResponse.json({ scheduled: true });
  }

  return NextResponse.json(body, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
