"use client";

import Title from "@/components/common/title";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { BlogsQueryResult, HomePageQueryResult } from "@sanity-types/*";
import { useState } from "react";
import CategoriesGroupCard from "./categoriesGroupCard";
import { CarouselItem } from "@/components/ui/carousel";
import BlogCardCarousel from "../../../../../components/common/blogCardCarousel";

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
    <>
      <div className="max-width-container padding-container">
        <div className="flex flex-col gap-6">
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
        </div>
      </div>
      <div>
        {selectedCategory && (
          <BlogCardCarousel>
            {blogs
              .filter((blog) => blog.category.label === selectedCategory.label)
              .slice(0, 7)
              .map((blog) => (
                <div key={blog._id} className="min-w-60 max-w-60 sm:min-w-100 sm:max-w-100">
                  <CarouselItem>
                    <CategoriesGroupCard blog={blog} />
                  </CarouselItem>
                </div>
              ))}
          </BlogCardCarousel>
        )}
      </div>
    </>
  );
};

export default Group;
