import BlogHeader from "@/components/common/blogHeader";
import Title from "@/components/common/title";
import { cn, formatDate } from "@/lib/utils";
import { SanityImage } from "@/sanity/sanityImage";
import { HomePageQueryResult } from "@sanity-types/*";
import Link from "next/link";

const HeroRight = ({
  homePage,
}: {
  homePage: NonNullable<HomePageQueryResult>;
}) => {
  return (
    <div className="flex flex-col gap-6 pt-10 lg:pt-4 lg:pb-10">
      <Title title={homePage.heroRightTitle} />
      <div className="flex flex-col gap-4">
        {homePage.heroRightBlogs.map((blog, index) => (
          <Link
            href={`/${blog.category.slug.current}/${blog.slug.current}`}
            key={blog._id}
            className={cn(
              "grid gap-2  sm:grid-cols-6 group",
              homePage.heroRightBlogs.length - 1 !== index &&
                "pb-4 border-b border-gray-300",
            )}
          >
            <BlogHeader
              author={blog.author.authorName}
              date={formatDate(blog.uplodedAt || blog._updatedAt)}
              category={blog.category.label}
              title={blog.title}
              className="sm:col-span-4"
              titleClassname="group-hover:text-chathams-blue"
            />
            <div className="sm:col-span-2">
              <SanityImage
                src={blog.heroImage}
                alt={blog.heroImage.alt}
                width={100}
                height={100}
                className="object-cover w-full min-h-25 lg:w-auto lg:h-25 rounded-xl"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroRight;
