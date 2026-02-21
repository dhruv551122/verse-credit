import BlogHeader from "@/components/common/blogHeader";
import { formatDate } from "@/lib/utils";
import { SanityImage } from "@/sanity/sanityImage";
import { BlogsQueryResult } from "@sanity-types/*";
import Link from "next/link";

const CategoriesGroupCard = ({
  blog,
}: {
  blog: NonNullable<BlogsQueryResult>[number];
}) => {
  return (
    <Link
      href={`/${blog.category.slug.current}/${blog.slug.current}`}
      className=" duration-300  group"
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
        titleClassname="group-hover:text-chathams-blue"
      />
    </Link>
  );
};

export default CategoriesGroupCard;
