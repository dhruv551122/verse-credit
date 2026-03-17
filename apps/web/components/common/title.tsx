import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

const Title = ({
  title,
  className,
}: {
  title: string;
  className?: HTMLProps<HTMLElement>["className"];
}) => {
  return (
    <h2
      className={cn(
        "pb-2 text-[22px] md:text-3xl font-semibold border-b border-gray-300 text-tuatara",
        className,
      )}
    >
      {title}
    </h2>
  );
};

export default Title;
