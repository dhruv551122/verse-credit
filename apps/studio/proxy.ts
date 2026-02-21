import { NextResponse } from "next/server";

export function proxy() {
  const res = NextResponse.next();

  res.headers.set("Access-Control-Allow-Origin", `${process.env.FRONTEND_URL}`);
  res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return res;
}
