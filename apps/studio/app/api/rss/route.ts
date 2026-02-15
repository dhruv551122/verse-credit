import { sanityFetch } from "studio/sanity/lib/live";
import { blogsRssQuery } from "studio/sanity/lib/query";
import { BlogsRssQueryResult } from "../../../../../packages/types/src";
import { NextResponse } from "next/server";

const escapeXml = (unsafe: string = "") =>
  unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });

export const GET = async () => {
  const { data }: { data: NonNullable<BlogsRssQueryResult> } =
    await sanityFetch({ query: blogsRssQuery });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(
    "VerseCredit: Global & Indian Financial News at a Glance",
  )}</title>
  <link>${process.env.FRONTEND_URL}</link>
  <description>${escapeXml(
    "Latest finance, market, and economic news delivered clearly and accurately.",
  )}</description>
  <language>en-us</language>

  ${data
    .map((blog) => {
      const postUrl = `${process.env.FRONTEND_URL}/${blog.category.slug.current}/${blog.slug.current}`;
      const imageUrl = blog.heroImage.asset?.url;

      return `<item>
        <title>${escapeXml(blog.title)}</title>
        <link>${postUrl}</link>
        <category>${escapeXml(blog.category.label)}</category>
        ${
          imageUrl ?
            `<enclosure url="${imageUrl}" length="100000" type="image/jpeg" />`
          : ""
        }
        <pubDate>${new Date(
          blog.uplodedAt || blog._createdAt,
        ).toUTCString()}</pubDate>
        <guid>${postUrl}</guid>
      </item>`;
    })
    .join("")}
</channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
