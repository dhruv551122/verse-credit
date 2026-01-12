"use client";

import RichText from "@/components/ui/rich-text";
import useActiveHeading from "@/hooks/useActiveHeading";
import { cn, slugify } from "@/lib/utils";
import { BlockContent, BlogBySlugQueryResult } from "@sanity-types/*";
import Link from "next/link";

const extractTableContentData = (content: BlockContent) => {
  return content
    .filter((block) => block._type === "block" && block.style === "h2")
    .map((block: BlockContent[number]) => {
      const seen = new Map<string, number>();

      const makeUniqueId = (base: string) => {
        const count = seen.get(base) ?? 0;
        seen.set(base, count + 1);
        return count === 0 ? base : `${base}-${count}`;
      };
      const title = block.children?.map((child) => child.text).join("") ?? "";
      return {
        title,
        slug: slugify(makeUniqueId(title)),
      };
    });
};

const BlogPageTop = ({
  blog,
}: {
  blog: NonNullable<BlogBySlugQueryResult>;
}) => {
  const tableOfContent = extractTableContentData(blog.content);

  const activeId = useActiveHeading(
    tableOfContent.map((content) => content.slug)
  );

  return (
    <div className="max-width-container padding-container">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <div className="sticky top-20">
            <h4 className="py-2 border-b border-gray-300">Table Content</h4>
            <div className="flex flex-col gap-1 py-1 border-b border-gray-300 ">
              {tableOfContent.map((tableIndex) => (
                <Link
                  key={tableIndex.slug}
                  href={`#${tableIndex.slug}`}
                  className={cn(
                    "duration-300 hover:text-chathams-blue",
                    activeId === tableIndex.slug && "text-chathams-blue"
                  )}
                >
                  {tableIndex.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-4 pl-4 border-l border-gray-300">
          <RichText content={blog.content} />
        </div>
      </div>
    </div>
  );
};

export default BlogPageTop;
