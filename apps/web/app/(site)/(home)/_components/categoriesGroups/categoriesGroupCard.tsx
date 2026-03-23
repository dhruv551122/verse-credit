import BlogHeader from "@/components/common/blogHeader";
import { cn, formatDate } from "@/lib/utils";
import { SanityImage } from "@/sanity/sanityImage";
import { BlogsQueryResult } from "@sanity-types/*";
import Link from "next/link";
import { HTMLProps } from "react";

const CategoriesGroupCard = ({
  blog,
  className,
}: {
  blog: NonNullable<BlogsQueryResult>[number];
  className?: HTMLProps<HTMLElement>["className"];
}) => {
  return (
    <Link
      href={`/${blog.category.slug.current}/${blog.slug.current}`}
      className={cn("duration-300 group", className)}
    >
      <div className="w-full mb-6">
        <SanityImage
          src={blog.heroImage}
          alt={blog.heroImage.alt}
          width={100}
          height={100}
          className="object-cover w-full rounded-xl"
        />
      </div>
      <BlogHeader
        author={blog.author.authorName}
        date={formatDate(blog.uplodedAt || blog._updatedAt)}
        category={blog.category.label}
        title={blog.title}
        titleClassname="group-hover:text-deep-bright-red"
      />
    </Link>
  );
};

export default CategoriesGroupCard;
