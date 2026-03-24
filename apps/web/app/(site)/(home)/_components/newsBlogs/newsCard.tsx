import BlogHeader from "@/components/common/blogHeader";
import { formatDate } from "@/lib/utils";
import { SanityImage } from "@/sanity/sanityImage";
import { BlogsQueryResult } from "@sanity-types/*";
import Link from "next/link";

const NewsCard = ({
  blog,
}: {
  blog: NonNullable<BlogsQueryResult>[number];
}) => {
  return (
    <Link
      href={`/${blog.category.slug.current}/${blog.slug.current}`}
      className="flex flex-col overflow-hidden group "
    >
      <BlogHeader
        className="pb-4 bg-white h-36"
        author={blog.author.authorName}
        category={blog.category.label}
        date={formatDate(blog.uplodedAt || blog._updatedAt)}
        title={blog.title}
        titleClassname="line-clamp-3 group-hover:text-deep-bright-red duration-300"
      />
      <SanityImage
        src={blog.heroImage}
        alt={blog.heroImage.alt}
        width={100}
        height={100}
        className="object-cover w-full h-auto rounded-xl"
      />
    </Link>
  );
};

export default NewsCard;
