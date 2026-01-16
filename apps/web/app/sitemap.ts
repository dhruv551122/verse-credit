import { SiteMapQueryResult } from "@sanity-types/*";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/site-map`)

  const data: NonNullable<SiteMapQueryResult> = await res.json()

  const baseUrl = "https://yourdomain.com";

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: new Date(),
      priority: 0.5,
    },
  ];

  const categoryRoutes = data.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  const blogRoutes = data.flatMap((category) =>
    category.posts.map((post) => ({
      url: `${baseUrl}/${post.categorySlug}/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      priority: 0.6,
    }))
  );

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...blogRoutes,
  ];
}
