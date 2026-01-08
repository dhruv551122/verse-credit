import Title from "@/components/common/title";
import { BlogsByCategoryQueryResult } from "@sanity-types/*";
import CategoryPageBlogCard from "./categoryPageBlogCard";
import { formatDate } from "@/lib/utils";
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
    <div className="">
      <Title title={title} />
      <div className="flex gap-4">
        {blogs.slice(0, 2).map((blog, index) => (
          <Link
            href={`/${blog.category.slug.current}/${blog.slug.current}`}
            className="duration-300 group flex-1"
            key={blog._id}
          >
            <div className="w-full mb-6">
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
      {blogs.slice(2).map((blog) => (
        <CategoryPageBlogCard blog={blog} key={blog._id} />
      ))}
    </div>
  );
}

export default CategoryBlogs;
