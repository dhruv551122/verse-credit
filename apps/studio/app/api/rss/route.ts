import { sanityFetch } from "studio/sanity/lib/live";
import { blogsRssQuery } from "studio/sanity/lib/query";
import { BlogsRssQueryResult } from "../../../../../packages/types/src";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { data }: { data: NonNullable<BlogsRssQueryResult> } =
    await sanityFetch({ query: blogsRssQuery });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>Your Blog</title>
<link>${process.env.FRONTEND_URL}</link>
<description>Latest blog posts</description>
<language>en-us</language>

${data
  .map((blog) => {
    const postUrl = `${process.env.FRONTEND_URL}/blog/${blog.slug.current}?utm_source=rss&utm_medium=social`;
    const imageUrl = blog.heroImage.asset?.url;

    return `<item>
<title><![CDATA[${blog.title}]]></title>
<link>${postUrl}</link>
<description><![CDATA[
${imageUrl ? `<img src="${imageUrl}" alt="${blog.title}" />` : ""}
<p>${blog.description}</p>
]]></description>
${imageUrl ? `<enclosure url="${imageUrl}" type="image/jpeg" />` : ""}
<pubDate>${new Date(blog.uplodedAt || blog._createdAt).toUTCString()}</pubDate>
<guid isPermaLink="true">${postUrl}</guid>
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
