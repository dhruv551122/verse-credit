import { cn } from "@/lib/utils";
import { BlogCategoriesQueryResult } from "@sanity-types/sanity.types";
import Link from "next/link";

const BlogHeader = ({
  category,
  title,
  author,
  slug,
  date,
  headingClassname,
  titleClassname,
  authorClassname,
  dateClassname,
  className,
}: {
  category: NonNullable<BlogCategoriesQueryResult>[number];
  title: string;
  author: string;
  slug: string;
  date: string;
  headingClassname?: string;
  titleClassname?: string;
  authorClassname?: string;
  dateClassname?: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Link
        href={`/${category.slug.current}`}
        className={cn(
          "text-base font-bold uppercase text-chathams-blue",
          headingClassname
        )}
      >
        {category.label}
      </Link>
      <Link
        href={`/${category.slug.current}/${slug}`}
        className={cn(
          "text-[22px] font-semibold text-tuatara leading-6",
          titleClassname
        )}
      >
        {title}
      </Link>
      <p className="text-sm ">
        <span
          className={cn(
            "pr-2 font-semibold text-gray-600 border-r-2 border-gray-600",
            authorClassname
          )}
        >
          {author}
        </span>
        <span className={cn("text-gray-500 pl-2", dateClassname)}>{date}</span>
      </p>
    </div>
  );
};

export default BlogHeader;
