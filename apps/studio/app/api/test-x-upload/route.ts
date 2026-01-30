import { NextResponse } from "next/server";
import { uploadMediaToX } from "../create-x-post/route";

export async function GET() {
  const data = await uploadMediaToX(
    "https://images.unsplash.com/photo-1768593049340-6e50351b4b2f"
  );

  if(data?.error){
    console.log('Error uploading media')
    return NextResponse.json(data, {status: data.code})
  }

  return NextResponse.json({ data });
}