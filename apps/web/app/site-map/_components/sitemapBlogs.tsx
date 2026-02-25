"use client";

import { SiteMapQueryResult } from "@sanity-types/*";
import { ArrowRight, LucideArrowUpRight } from "lucide-react";
import Link from "next/link";

const SitemapBlogs = ({ data }: { data: NonNullable<SiteMapQueryResult> }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 text-tuatara">
      {data.map((category) => (
        <div key={category._id} className="flex flex-col gap-2">
          <h4 className="pb-2 text-base font-bold uppercase border-b border-gray-300 text-chathams-blue">
            {category.title}
          </h4>
          <div className="flex flex-col gap-2">
            {category.blogs.slice(0, 9).map((blog) => (
              <Link
                href={`/${blog.categorySlug}/${blog.slug}`}
                key={blog.slug}
                className="flex items-center gap-2 duration-300 cursor-pointer text-tuatara hover:text-strong-amber group w-fit"
              >
                <ArrowRight className="duration-300 shrink-0 group-hover:translate-x-1" />
                <span className="font-medium">{blog.title}</span>
              </Link>
            ))}
          </div>
          <Link
            href={`${category.slug}`}
            className="flex items-center gap-1 font-medium duration-300 text-strong-amber hover:brightness-80"
          >
            <span>All blogs</span>
            <LucideArrowUpRight className="size-4" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SitemapBlogs;
