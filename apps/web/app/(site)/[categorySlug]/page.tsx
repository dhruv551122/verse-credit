import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { URLSearchParams } from "url";

const CategoriesPage = async ({
  params,
}: {
  params: { categorySlug: string };
}) => {
  const param = await params;
  const searchParams = new URLSearchParams(param).toString();
  const blogsData = await fetch(
    `${process.env.BACKEND_URL}/api/blogs?${searchParams}`
  );
  const categoryData = await fetch(
    `${process.env.BACKEND_URL}/api/category?${searchParams}`
  );
  const blogs = await blogsData.json();
  const category = await categoryData.json();
  console.log(category, blogs);
  return (
    <div className="mt-[67px] font-inter">
      <div className="py-6! max-width-container padding-container">
        <div className="flex items-center gap-2 text-gray-500">
          <Link href="/" className="duration-300 hover:text-gray-700">
            Home
          </Link>
          <ChevronRight />
          <Link href={`/${category.slug.current}`} className="text-gray-700">
            {category.label}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
