import { SiteMapQueryResult } from "@sanity-types/*";
import Link from "next/link";
import SitemapBlogs from "./_components/sitemapBlogs";
import { sanityFetch } from "@/sanity/lib/live";
import { siteMapQuery } from "@/sanity/lib/query";
import { notFound } from "next/navigation";

export const metadata = {
  title: "VerseCredit: Sitemap",
  description: "Simple website sitemap for easy navigation",
};

const sitePages = [
  { slug: "/", label: "Home" },
  { slug: "/calculators", label: "Calculators" },
  { slug: "/about-us", label: "About Us" },
  { slug: "/contact-us", label: "Contact Us" },
];

export default async function SitemapPage() {
  const { data } = await sanityFetch<NonNullable<SiteMapQueryResult>>({
    query: siteMapQuery,
  });

  if (!data) {
    return notFound();
  }

  return (
    <div className="">
      <section className="sticky top-0 z-10 bg-bright-royal-blue rounded-b-2xl">
        <div className="text-white max-width-container padding-container">
          <h1 className="mb-8 text-3xl font-bold ">Sitemap</h1>

          {/* Static Pages */}
          <div>
            <h2 className="mb-3 text-xl font-semibold">Pages</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {sitePages.map((page) => (
                <Link
                  key={page.label}
                  href={page.slug}
                  className="hover:brightness-80"
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Sitemap */}
      <section className="max-width-container padding-container">
        <h2 className="mb-3 text-xl font-semibold text-tuatara">Blogs</h2>

        <div>
          <SitemapBlogs data={data} />
        </div>
      </section>
    </div>
  );
}
