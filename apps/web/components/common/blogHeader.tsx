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
    <div className={cn("flex flex-col gap-1", className)}>
      <h4
        className={cn(
          "text-base font-bold uppercase text-chathams-blue leading-[115%]",
          headingClassname,
        )}
      >
        {category}
      </h4>
      <h2
        className={cn(
          "text-[18px] sm:text-xl font-semibold text-tuatara duration-300 leading-[115%]",
          titleClassname,
        )}
      >
        {title}
      </h2>
      {author && date && (
        <p className="text-xs  ">
          <span
            className={cn(
              "pr-1.5 font-semibold text-gray-500 border-r-2 border-gray-500 leading-[115%]",
              authorClassname,
            )}
          >
            {author}
          </span>
          <span className={cn("text-gray-400 pl-1.5 font-medium leading-[115%]", dateClassname)}>
            {date}
          </span>
        </p>
      )}
    </div>
  );
};

export default BlogHeader;
