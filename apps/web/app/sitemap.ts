import { sanityFetch } from "@/sanity/lib/live";
import { calculatorsQuery, siteMapQuery } from "@/sanity/lib/query";
import { CalculatorsQueryResult, SiteMapQueryResult } from "@sanity-types/*";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await sanityFetch<NonNullable<SiteMapQueryResult>>({
    query: siteMapQuery,
  });

  const { data: calculators } = await sanityFetch<
    NonNullable<CalculatorsQueryResult>
  >({
    query: calculatorsQuery,
  });

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
      url: `${baseUrl}/site-map`,
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

  const calculatorsRoutes = calculators.map((calculator) => ({
    url: `${baseUrl}/calculators/${calculator.slug.current}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...blogRoutes,
    ...calculatorsRoutes,
  ];
}
