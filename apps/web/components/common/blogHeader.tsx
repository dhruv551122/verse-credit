import { cn } from "@/lib/utils";

const BlogHeader = ({
  category,
  title,
  author,
  date,
  headingClassname,
  titleClassname,
  authorClassname,
  dateClassname,
  className,
}: {
  category: string;
  title: string;
  author?: string;
  date?: string;
  headingClassname?: string;
  titleClassname?: string;
  authorClassname?: string;
  dateClassname?: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <h4
        className={cn(
          "text-base font-bold uppercase text-chathams-blue",
          headingClassname
        )}
      >
        {category}
      </h4>
      <h2
        className={cn(
          "text-xl sm:text-[22px] font-semibold text-tuatara leading-6",
          titleClassname
        )}
      >
        {title}
      </h2>
      {author && date && (
        <p className="text-xs sm:text-sm ">
          <span
            className={cn(
              "pr-2 font-semibold text-gray-600 border-r-2 border-gray-600",
              authorClassname
            )}
          >
            {author}
          </span>
          <span className={cn("text-gray-500 pl-2", dateClassname)}>
            {date}
          </span>
        </p>
      )}
    </div>
  );
};

export default BlogHeader;
