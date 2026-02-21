import { BlogBySlugQueryResult, BlogsQueryResult } from "@sanity-types/*";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import BlogContent from "./blogContent";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RecommandedBlogs from "./recommandedBlog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string; blogSlug: string }>;
}): Promise<Metadata> {
  const { categorySlug, blogSlug } = await params;

  const searchParams = new URLSearchParams({
    categorySlug,
    blogSlug,
  }).toString();

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/blog?${searchParams}`,
  );

  if (!res.ok) {
    return {
      title: "Blog not found",
      description: "The requested blog post does not exist.",
    };
  }

  const blog: NonNullable<BlogBySlugQueryResult> = await res.json();

  return {
    title: blog.title,
    description: blog.description,
    alternates: {
      canonical: `/blog/${categorySlug}/${blogSlug}`,
    },
  };
}

const BlogPage = async ({
  params,
}: {
  params: Promise<{ categorySlug: string; blogSlug: string }>;
}) => {
  const blogParams = await params;
  const searchParams = new URLSearchParams(blogParams).toString();
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/blog?${searchParams}`,
  );

  if (!res.ok) notFound();
  const blog: NonNullable<BlogBySlugQueryResult> = await res.json();

  // const blogsRes = await fetch(`${process.env.BACKEND_URL}/api/blogs`);

  // const blogs = await blogsRes.json();
  // const randomBlogs = blogs.sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <div className="mt-16.75 font-inter">
      <div className="py-6! font-medium max-width-container padding-container">
        <div className="flex items-center gap-2 text-gray-500">
          <Link href="/" className="duration-300 hover:text-gray-700">
            Home
          </Link>
          <ChevronRight size={24} className="min-w-6" />
          <Link href={`/${blog.category.slug.current}`}>
            <div className="text-gray-500 hover:text-gray-700 ">
              {blog.category.label}
            </div>
          </Link>
          <ChevronRight size={24} className="min-w-6" />
          <div className="text-gray-700 truncate">{blog.title}</div>
        </div>
      </div>
      <BlogContent blog={blog} />
      {/* <RecommandedBlogs blogs={randomBlogs}/> */}
    </div>
  );
};

export default BlogPage;

export async function generateStaticParams() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/blogsByClient`);

  if (!res.ok && !res.ok) return [];

  if (!res.ok && !res.ok) return [];
  const data: NonNullable<BlogsQueryResult> = await res.json();

  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map((blog) => ({
    categorySlug: blog.category.slug.current,
    blogSlug: blog.slug.current,
  }));
}
