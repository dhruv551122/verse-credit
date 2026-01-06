import BlogHeader from "@/components/common/blogHeader";
import Title from "@/components/common/title";
import { cn, formatDate } from "@/lib/utils";
import { SanityImage } from "@/sanity/sanityImage";
import { BlogsQueryResult, HomePageQueryResult } from "@sanity-types/*";
import Link from "next/link";

const HeroLeft = ({
  title,
  blogData,
}: {
  title: NonNullable<HomePageQueryResult>["heroLeftTitle"];
  blogData: NonNullable<BlogsQueryResult>;
}) => {
  const latestBlogs = blogData.slice(0, 3);
  return (
    <div className="flex flex-col gap-4 py-10 lg:border-gray-300 lg:pr-8 lg:border-r">
      <Title title={title} />
      <div className="grid grid-cols-2 gap-6">
        {latestBlogs.map((blog, index) => (
          <Link
            href={`/${blog.category.slug.current}/${blog.slug.current}`}
            key={blog._id}
            className={cn(
              "flex flex-col gap-4 group",
              index === 0 && "col-span-2"
            )}
          >
            <BlogHeader
              author={blog.author?.authorName || "verseCredit"}
              date={formatDate(blog.uplodedAt || blog._updatedAt)}
              category={blog.category.label}
              title={blog.title}
              titleClassname={cn(
                "group-hover:text-chathams-blue",
                index === 0 && "text-3xl"
              )}
            />
            <div className="w-full overflow-hidden rounded-xl">
              <SanityImage
                src={blog.heroImage}
                alt={blog.heroImage.alt}
                width={100}
                height={100}
                className="object-cover w-full h-auto"
              />
            </div>
            {index === 0 && (
              <>
                <p className="text-base text-gray-500">{blog.description}</p>
                <div className="h-px bg-gray-300"></div>
              </>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroLeft;
