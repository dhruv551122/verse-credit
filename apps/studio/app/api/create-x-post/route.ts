import { NextRequest, NextResponse } from "next/server";
import { TweetV2PostTweetResult, TwitterApi } from "twitter-api-v2";

/* -------------------- CONSTANTS -------------------- */
const MAX_TWEET_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

/* -------------------- TWITTER CLIENT -------------------- */
const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY!,
  appSecret: process.env.TWITTER_CONSUMER_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

const rwClient = client.readWrite;

/* -------------------- MEDIA UPLOAD -------------------- */
export const uploadMediaToX = async (mediaUrl: string): Promise<string> => {
  const res = await fetch(mediaUrl);
  if (!res.ok) {
    throw new Error("Image fetch failed");
  }

  const buffer = Buffer.from(await res.arrayBuffer());

  try {
    const mediaId = await rwClient.v1.uploadMedia(buffer, {
      mimeType: "image/png",
    });

    return mediaId;
  } catch (error: any) {
    console.error("Media upload error:", error?.data || error);
    throw new Error("Media upload failed");
  }
};

/* -------------------- TWEET WITH RETRY -------------------- */
const uploadTweetOnX = async (
  mediaId: string | undefined,
  text: string,
  attempt = 1,
): Promise<TweetV2PostTweetResult> => {
  try {
    console.log(`Tweet attempt ${attempt}`);

    const body: any = {
      reply_settings: "verified",
      share_with_followers: false,
      text,
    };

    if (mediaId?.trim()) {
      body.media = { media_ids: [mediaId] };
    }

    const data = await client.v2.tweet(body);
    return data; // ✅ SUCCESS → EXIT
  } catch (error: any) {
    console.error("Tweet error:", error?.data || error);

    // ❌ Stop retrying after limit
    if (attempt >= MAX_TWEET_RETRIES) {
      throw new Error("Tweet failed after max retries");
    }

    // ❌ Permanent errors → do not retry
    const status = error?.code || error?.data?.status;
    if ([400, 401, 403].includes(status)) {
      throw new Error("Permanent Twitter error");
    }

    // ⏳ Wait before retry
    await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));

    // 🔁 Retry
    return uploadTweetOnX(mediaId, text, attempt + 1);
  }
};

/* -------------------- WEBHOOK HANDLER -------------------- */
export const POST = async (req: NextRequest) => {
  const body = await req.json();

  if (
    req.headers.get("x-sanity-secret") !== process.env.SANITY_WEBHOOK_SECRET
  ) {
    return NextResponse.json("Unauthorized access!", { status: 401 });
  }

  if (!body?.title || !body?.description || !body?.slug || !body?.category) {
    return NextResponse.json(
      { success: false, message: "Invalid payload" },
      { status: 400 },
    );
  }

  // Scheduled blog → skip
  if (body.publishedAt && new Date(body.publishedAt) > new Date()) {
    return NextResponse.json({ scheduled: true });
  }

  // Duplicate protection
  if (body.postedToX) {
    return NextResponse.json({ skipped: true });
  }

  const blogUrl = `${process.env.FRONTEND_URL}/${body.category.slug.current}/${body.slug.current}`;

  try {
    const mediaId = body.heroImage?.url
      ? await uploadMediaToX(body.heroImage.url)
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
      `#${body.category.label.replaceAll(
        " ",
        "",
      )} #Investing #StockMarket #InvestSmart`,
    ].join("\n");

    const res = await uploadTweetOnX(mediaId, text);

    if (!res?.data?.id) {
      throw new Error("Tweet creation failed");
    }

    // Mark as posted in Sanity
    const p = await client.patch(body._id);
    p.set({ postedToX: true }).commit();
    return NextResponse.json({
      ok: true,
      tweeted: true,
      blogId: body._id,
      tweetId: res.data.id,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        ok: false,
        error: error.message,
        blogId: body._id,
      },
      { status: 500 },
    );
  }
};
