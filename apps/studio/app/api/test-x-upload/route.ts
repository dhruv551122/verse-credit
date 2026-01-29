import { NextResponse } from "next/server";
import { uploadMediaToX } from "../create-x-post/route";

export async function GET() {
  const mediaId = await uploadMediaToX(
    "https://www.istockphoto.com/photos/photo-image-art"
  );

  console.log(mediaId)

  return NextResponse.json({ mediaId });
}