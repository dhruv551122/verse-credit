import { SiteMapQueryResult } from "@sanity-types/*";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/site-map`);

  const data: NonNullable<SiteMapQueryResult> = await res.json();

  const baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}`;

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ];

  const categoryRoutes = data.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(),
    priority: 0.8,
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
