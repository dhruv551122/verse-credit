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
    <Link href={`/${blog.category.slug.current}/${blog.slug.current}`} className="rounded-xl group overflow-hidden min-w-70 max-w-80">
      <BlogHeader
        className="p-6 bg-white h-50"
        author={blog.author.authorName}
        category={blog.category.label}
        date={formatDate(blog.uplodedAt || blog._updatedAt)}
        title={blog.title}
        titleClassname="line-clamp-3 group-hover:text-chathams-blue duration-300"
      />
      <SanityImage
        src={blog.heroImage}
        alt={blog.heroImage.alt}
        width={100}
        height={100}
        className="w-full h-56 object-cover"
      />
    </Link>
  );
};

export default NewsCard;
