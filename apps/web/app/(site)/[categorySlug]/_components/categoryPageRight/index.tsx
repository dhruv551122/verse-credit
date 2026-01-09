import { Button } from "@/components/ui/button";
import { BlogCategoryPageQueryResult } from "@sanity-types/*";
import Link from "next/link";

const CategoryPageRight = ({
  categories,
}: {
  categories: NonNullable<BlogCategoryPageQueryResult>["otherCategories"];
}) => {
  return (
    <div className="flex flex-wrap gap-4 h-fit w-fit pl-8 border-gray-300">
      {categories.map((category) => (
        <Link key={category._id} href={`/${category.slug.current}`}>
          <Button
            variant="outline"
            className="cursor-pointer hover:border-chathams-blue duration-300 hover:text-chathams-blue"
          >
            <span>{category.label}</span>
            <span className="px-2 bg-gray-200 rounded-sm">
              {category.blogCount}
            </span>
          </Button>
        </Link>
      ))}
    </div>
  );
};
export default CategoryPageRight;
