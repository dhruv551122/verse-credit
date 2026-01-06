"use client";

import BlogHeader from "@/components/common/blogHeader";
import Title from "@/components/common/title";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn, formatDate } from "@/lib/utils";
import { SanityImage } from "@/sanity/sanityImage";
import { BlogsQueryResult, HomePageQueryResult } from "@sanity-types/*";
import Link from "next/link";
import { useState } from "react";

const Group = ({
  group,
  blogs,
}: {
  group: NonNullable<HomePageQueryResult>["categoryGroup"][number];
  blogs: NonNullable<BlogsQueryResult>;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    | NonNullable<HomePageQueryResult>["categoryGroup"][number]["categories"][number]
    | undefined
  >(group.categories[0]);
  return (
    <div className="max-width-container padding-container">
      <div className="flex flex-col gap-8">
        <Title title={group.title} />
        <div className="flex flex-wrap items-center gap-4">
          {group.categories.map((category) => (
            <div key={category._id}>
              <Button
                variant="outline"
                className={cn(
                  category.label === selectedCategory?.label &&
                    "border-chathams-blue text-chathams-blue"
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category.label}
              </Button>
            </div>
          ))}
        </div>
        <div>
          {selectedCategory && (
            <Carousel>
              <CarouselContent>
                {blogs
                  .filter(
                    (blog) => blog.category.label === selectedCategory.label
                  )
                  .slice(0, 7)
                  .map((blog) => (
                    <CarouselItem
                      key={blog._id}
                      className="flex flex-col gap-6 duration-300 basis-2/7 group pl-0 ml-4"
                    >
                      <Link href={`/${blog.category.slug.current}/${blog.slug.current}`} >
                        <div className="w-full">
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
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <div className="flex items-center justify-center gap-6 mt-6">
                <CarouselPrevious className="relative left-0 cursor-pointer translate-0" />
                <CarouselNext className="relative right-0 cursor-pointer translate-0" />
              </div>
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default Group;
