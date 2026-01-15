"use client";

import RichText from "@/components/ui/rich-text";
import useActiveHeading from "@/hooks/useActiveHeading";
import { cn, slugify } from "@/lib/utils";
import { BlockContent, BlogBySlugQueryResult } from "@sanity-types/*";
import BlogTop from "./blogTop";

const extractTableContentData = (content: BlockContent) => {
  return content
    .filter((block) => block._type === "block" && block.style === "h2")
    .map((block: BlockContent[number]) => {
      if (block._type === "block") {
        const title = block.children?.map((child) => child.text).join("") ?? "";
        return {
          title,
          id: slugify(title),
        };
      }
    })
    .filter((block) => typeof block !== "undefined");
};

const BlogContent = ({
  blog,
}: {
  blog: NonNullable<BlogBySlugQueryResult>;
}) => {
  const tableOfContent = extractTableContentData(blog.content);

  const activeId = useActiveHeading(tableOfContent);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return null;
    const y = element?.getBoundingClientRect().top + window.scrollY - 80;
    scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      <BlogTop blog={blog} />
      <div className="max-width-container padding-container text-tuatara">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
          <div className="md:col-span-2 ">
            <div className="sticky pb-2 border-b border-gray-300 top-20">
              <h4 className="py-2 mb-2 text-xl font-semibold border-b border-gray-300">
                Table of Content
              </h4>
              <ul className="flex flex-col gap-2 py-1 ">
                {tableOfContent.length > 0 &&
                  tableOfContent.map((tableIndex) => (
                    <li
                      role="button"
                      key={tableIndex.id}
                      onClick={(e) => handleScroll(tableIndex.id)}
                      className={cn(
                        "duration-300 hover:text-chathams-blue cursor-pointer font-medium",
                        activeId === tableIndex.id && "text-chathams-blue"
                      )}
                    >
                      {tableIndex.title}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="md:col-span-4 md:pl-6 md:border-l md:border-gray-300">
            <RichText content={blog.content} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogContent;
