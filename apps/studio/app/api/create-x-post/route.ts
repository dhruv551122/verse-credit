import { NextRequest, NextResponse } from "next/server";
import { TweetV2PostTweetResult, TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY!,
  appSecret: process.env.TWITTER_CONSUMER_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

const rwClient = client.readWrite;

export const uploadMediaToX = async (mediaUrl: string) => {
  const res = await fetch(mediaUrl);
  if (!res.ok) {
    throw new Error("Image fetch failed");
  }
  const buffer = Buffer.from(await res.arrayBuffer());

  console.log(res.headers.get("type"));

  // Upload image
  try {
    const mediaId = await rwClient.v1.uploadMedia(buffer, {
      mimeType: "image/png",
    });

    return mediaId;
  } catch (err: any) {
    console.error(err.data);
    console.error(err.data?.errors);
    return err;
  }
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

    const data = await client.v2.tweet({
      ...body,
    });

    return data;
  } catch (error) {
    throw new Error("Error creating tweet");
  }
};

export const POST = async (req: NextRequest) => {
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
  try {
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

    const res: TweetV2PostTweetResult = await uploadTweetOnX(mediaId, text);

    if (!res.data.id) {
      console.log("Error creating tweet");
      return Response.json(
        { success: false, erros: res.errors },
        { status: 500 },
      );
    }

    const p = await client.patch(body._id);
    p.set({ postedToX: true }).commit();

    return NextResponse.json({
      ok: true,
      tweeted: true,
      blogId: body._id,
      data: res.data,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err.message,
        blogId: body._id,
      },
      { status: 500 },
    );
  }
};
