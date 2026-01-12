import BlogHeader from "@/components/common/blogHeader";
import Title from "@/components/common/title";
import { formatDate } from "@/lib/utils";
import { SanityImage } from "@/sanity/sanityImage";
import { BlogsQueryResult } from "@sanity-types/*";
import Link from "next/link";

const RecommandedBlogs = ({
  blogs,
}: {
  blogs: NonNullable<BlogsQueryResult>;
}) => {
  return (
    <div className="max-width-container padding-container">
      <div className="flex flex-col gap-6">
        <Title title="Read Other Articles" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {blogs.map((blog) => (
            <Link
            key={blog._id}
              href={`/${blog.category.slug.current}/${blog.slug.current}`}
              className=" duration-300 group"
            >
              <div className="w-full mb-4 md:mb-6">
                <SanityImage
                  src={blog.heroImage}
                  alt={blog.heroImage.alt}
                  width={100}
                  height={100}
                  className="object-cover w-full h-auto rounded-xl"
                />
              </div>
              <BlogHeader
                author={blog.author.authorName}
                date={formatDate(blog.uplodedAt || blog._updatedAt)}
                category={blog.category.label}
                title={blog.title}
                titleClassname="group-hover:text-chathams-blue"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommandedBlogs;
