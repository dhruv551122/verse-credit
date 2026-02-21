import { formatDate } from "@/lib/utils";
import { SanityImage } from "@/sanity/sanityImage";
import { BlogBySlugQueryResult } from "@sanity-types/*";

const BlogTop = ({ blog }: { blog: NonNullable<BlogBySlugQueryResult> }) => {
  return (
    <div className="max-width-container px-4 md:px-10  text-tuatara">
      <div className="flex lg:flex-row flex-col gap-8 border-b pt-4 pb-8 md:pt-8 md:pb-16 border-gray-300">
        <div className="flex flex-1 flex-col gap-4">
          <h4 className="text-base font-bold uppercase text-chathams-blue">
            {blog.category.label}
          </h4>
          <h2 className="text-3xl sm:text-5xl text-balance font-semibold">
            {blog.title}
          </h2>
          <p className="text-base md:text-xl text-balance">
            {blog.description}
          </p>

          <p className="text-sm sm:text-base ">
            <span className="pr-2 font-semibold border-r-2 border-gray-500">
              {blog.author.authorName}
            </span>
            <span className="text-gray-500 pl-2 font-medium">
              {formatDate(blog.uplodedAt || blog._updatedAt)}
            </span>
          </p>
        </div>
        <div className="flex-1">
          <SanityImage
            src={blog.heroImage}
            alt={blog.heroImage.alt}
            width={100}
            height={100}
            className="w-full h-auto object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogTop;
