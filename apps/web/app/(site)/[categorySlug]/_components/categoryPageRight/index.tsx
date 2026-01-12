import BlogHeader from "@/components/common/blogHeader";
import Title from "@/components/common/title";
import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import { SanityImage } from "@/sanity/sanityImage";
import { BlogCategoryPageQueryResult } from "@sanity-types/*";
import Link from "next/link";

const CategoryPageRight = ({
  categoryPage,
}: {
  categoryPage: NonNullable<BlogCategoryPageQueryResult>;
}) => {
  return (
    <div className="pt-4 lg:pl-8 lg:pt-0">
      <div className="flex flex-col gap-4">
        <Title title={categoryPage.recommandedBlogsTitle} />
        <div className="flex flex-col">
          {categoryPage.recommandedBlogs.map((blog, index) => (
            <Link
              key={blog._id}
              href={`/${blog.category.slug.current}/${blog.slug.current}`}
              className={cn(
                "flex justify-between gap-4 py-4 ",
                index !== categoryPage.recommandedBlogs.length - 1 &&
                  "border-b border-gray-300"
              )}
            >
              <BlogHeader
                category={blog.category.label}
                title={blog.title}
                author={blog.author.authorName}
                date={formatDate(blog.uplodedAt || blog._updatedAt)}
                headingClassname="text-sm"
                authorClassname="text-xs"
                dateClassname="text-xs"
                titleClassname="group-hover:text-chathams-blue text-base!"
                className="gap-1"
              />
              <SanityImage
                src={blog.heroImage}
                alt={blog.heroImage.alt}
                width={100}
                height={100}
                className="object-cover size-25 rounded-2xl"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="pt-4">
        <Title title={categoryPage.otherCategoriesTitle} />
        <div className="flex flex-wrap gap-4 py-4 h-fit w-fit">
          {categoryPage.otherCategories.map((category) => (
            <Link key={category._id} href={`/${category.slug.current}`}>
              <Button
                variant="outline"
                className="text-sm font-semibold duration-300 cursor-pointer md:text-base text-tuatara hover:border-chathams-blue hover:text-chathams-blue"
              >
                <span>{category.label}</span>
                <span className="px-2 bg-gray-200 rounded-sm">
                  {category.blogCount}
                </span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CategoryPageRight;
