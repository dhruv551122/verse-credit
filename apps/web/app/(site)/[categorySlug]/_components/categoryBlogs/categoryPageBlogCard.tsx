import BlogHeader from "@/components/common/blogHeader";
import { cn, formatDate } from "@/lib/utils";
import { SanityImage } from "@/sanity/sanityImage";
import { BlogsQueryResult } from "@sanity-types/*";
import Link from "next/link";

const CategoryPageBlogCard = ({
  blog,
  className,
}: {
  blog: NonNullable<BlogsQueryResult>[number];
  className?: string;
}) => {
  return (
    <Link
      href={`/${blog.category.slug.current}/${blog.slug.current}`}
      className={cn(
        "duration-300 group grid grid-cols-1 gap-4 sm:grid-cols-3 ",
        className,
      )}
    >
      <div className="flex flex-col gap-1 sm:col-span-2">
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
          <span className="pl-2 font-medium text-gray-400">
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
  );
};

export default CategoryPageBlogCard;
