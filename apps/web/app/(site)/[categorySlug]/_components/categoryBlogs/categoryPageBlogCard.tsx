import BlogHeader from "@/components/common/blogHeader";
import { cn, formatDate } from "@/lib/utils";
import { SanityImage } from "@/sanity/sanityImage";
import { BlogsQueryResult } from "@sanity-types/*";
import Link from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";

const CategoryPageBlogCard = ({
  blog,
  className,
}: {
  blog: NonNullable<BlogsQueryResult>[number];
  className?: string;
}) => {
  return (
    <div className="py-8 border-b border-gray-300">
      <Link
        href={`/${blog.category.slug.current}/${blog.slug.current}`}
        className={cn("duration-300 group grid grid-cols-3 ", className)}
      >
        <div className="col-span-2 flex flex-col gap-1">
          <BlogHeader
            author={blog.author.authorName}
            category={blog.category.label}
            title={blog.title}
            headingClassname="mb-2"
            titleClassname="group-hover:text-chathams-blue"
          />
          <p>{blog.description}</p>
          <p className="text-xs sm:text-sm ">
            <span className="pr-2 font-semibold text-gray-500 border-r-2 border-gray-600">
              {blog.author.authorName}
            </span>
            <span className="text-gray-400 font-medium pl-2">
              {formatDate(blog.uplodedAt || blog._updatedAt)}
            </span>
          </p>
        </div>
        <div>
          <SanityImage
            src={blog.heroImage}
            alt={blog.heroImage.alt}
            width={100}
            height={100}
            className="object-cover w-full rounded-xl"
          />
        </div>
      </Link>
    </div>
  );
};

export default CategoryPageBlogCard;
