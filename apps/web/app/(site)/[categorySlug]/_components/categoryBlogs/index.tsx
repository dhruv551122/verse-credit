import Title from "@/components/common/title";
import { BlogsByCategoryQueryResult } from "@sanity-types/*";
import CategoryPageBlogCard from "./categoryPageBlogCard";
import { cn, formatDate } from "@/lib/utils";
import BlogHeader from "@/components/common/blogHeader";
import Link from "next/link";
import { SanityImage } from "@/sanity/sanityImage";

function CategoryBlogs({
  blogs,
  title,
}: {
  blogs: NonNullable<BlogsByCategoryQueryResult>;
  title: string;
}) {
  return (
    <>
      <Title title={title} />
      <div
        className={cn(
          "flex flex-col sm:flex-row gap-6 py-4 md:py-8",
          blogs.length > 2 && "border-b border-gray-300"
        )}
      >
        {blogs.slice(0, 2).map((blog) => (
          <Link
            href={`/${blog.category.slug.current}/${blog.slug.current}`}
            className="flex-1 duration-300 group"
            key={blog._id}
          >
            <div className="flex flex-col w-full gap-4 mb-4 sm:gap-6 sm:mb-6">
              <BlogHeader
                author={blog.author.authorName}
                date={formatDate(blog.uplodedAt || blog._updatedAt)}
                category={blog.category.label}
                title={blog.title}
                titleClassname="group-hover:text-chathams-blue"
              />
              <SanityImage
                src={blog.heroImage}
                alt={blog.heroImage.alt}
                width={100}
                height={100}
                className="object-cover w-full rounded-xl"
              />
            </div>
            <p>{blog.description}</p>
          </Link>
        ))}
      </div>
      {blogs.slice(2).map((blog, index) => (
        <div
          key={blog._id}
          className={cn(
            "py-6",
            index !== blogs.length - 3 && "border-b border-gray-300"
          )}
        >
          <CategoryPageBlogCard blog={blog} />
        </div>
      ))}
    </>
  );
}

export default CategoryBlogs;
