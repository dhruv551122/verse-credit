import { BlogBySlugQueryResult } from "@sanity-types/*";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import BlogPageTop from "./blogPageTop";

const BlogPage = async ({
  params,
}: {
  params: { categorySlug: string; blogSlug: string };
}) => {
  const blogParams = await params;
  // console.log(blogSlug, categorySlug)
  const searchParams = new URLSearchParams(blogParams).toString();
  const blogData = await fetch(
    `${process.env.BACKEND_URL}/api/blog?${searchParams}`
  );
  const blog: NonNullable<BlogBySlugQueryResult> = await blogData.json();
  return (
    <div className="mt-16.75 font-inter">
      <div className="py-6! font-medium max-width-container padding-container">
        <div className="flex items-center gap-2 text-gray-500">
          <Link href="/" className="duration-300 hover:text-gray-700">
            Home
          </Link>
          <ChevronRight />
          <Link href={`/${blog.category.slug.current}`}>
            <div className="text-gray-500 hover:text-gray-700">
              {blog.category.label}
            </div>
          </Link>
          <ChevronRight />
          <div className="text-gray-700">{blog.title}</div>
        </div>
      </div>
      <BlogPageTop blog={blog} />
    </div>
  );
};

export default BlogPage;
