import { SiteMapQueryResult } from "@sanity-types/*";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/site-map`);

  const data: NonNullable<SiteMapQueryResult> = await res.json();

  const baseUrl = "http://localhost:3001";

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators`,
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
    category.blogs.map((blog) => ({
      url: `${baseUrl}/${blog.categorySlug}/${blog.slug}`,
      lastModified: new Date(blog._updatedAt),
      priority: 0.8,
    })),
  );

  return [...staticRoutes, ...categoryRoutes, ...blogRoutes];
}
