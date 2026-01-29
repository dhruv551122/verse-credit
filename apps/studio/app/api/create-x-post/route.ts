import { NextRequest, NextResponse } from "next/server";
import { client } from "studio/sanity/lib/client";
import { twitterOAuth } from "studio/utils";

const uploadMediaToX = async (mediaUrl: string) => {
  const imageResponse = await fetch(mediaUrl);
  const buffer = Buffer.from(await imageResponse.arrayBuffer());

  const formData = new FormData();
  formData.append("media", new Blob([buffer]));

  const url = "https://upload.twitter.com/1.1/media/upload.json";

  const authHeader = twitterOAuth.toHeader(
    twitterOAuth.authorize(
      { url, method: "POST" },
      {
        key: process.env.TWITTER_ACCESS_TOKEN!,
        secret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
      },
    ),
  );

  const res = await fetch(url, {
    method: "POST",
    headers: {
      ...authHeader,
    },
    body: formData,
  });

  const data = await res.json();

  if (!data?.media_id_string) {
    throw new Error("Media upload failed");
  }

  return data.media_id_string as string;
};

const uploadTweetOnX = async (mediaId: string | undefined, text: string) => {
  try {
    const body: any = {
      reply_settings: "verified",
      share_with_followers: false,
      text: text,
    };

    if (mediaId?.trim()) {
      body.media = {
        media_ids: [mediaId],
      };
    }

    const res = await fetch("https://api.x.com/2/tweets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return new Response("Error creating tweet", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
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

    const mediaId = body.heroImage?.url
      ? await uploadMediaToX(body.heroImage?.url)
      : undefined;

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

    const res = await uploadTweetOnX(mediaId, text);

    if (!res?.data?.id) {
      console.log("Error creating tweet");
      return Response.json({ success: false, res }, { status: 500 });
    }

    await client.patch(body._id).set({ postedToX: true }).commit();

    return NextResponse.json(
      { success: "true" },
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
};
