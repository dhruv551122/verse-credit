import { cn } from "@/lib/utils";
import { SanityImage } from "@/sanity/sanityImage";
import { PortableText } from "next-sanity";
import Link from "next/link";
import React from "react";

interface Props {
  content: Array<any> | undefined;
  className?: string;
  highlightedTextClassName?: string;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const getTextFromChildren = (children: any): string => {
  if (typeof children === "string") return children;

  if (Array.isArray(children)) {
    return children
      .map((child) => (typeof child === "string" ? child : (child?.text ?? "")))
      .join("");
  }

  return "";
};

const RichText: React.FC<Props> = ({
  content,
  className,
  highlightedTextClassName,
}) => {
  const combinedClassNames = cn(
    "prose max-w-none text-black/50 font-zilla  prose-h2:text-[30px] sm:prose-h2:text-[55px] prose-h2:leading-[1] lg:prose-h2:text-[70px] xl:prose-h2:text-[100px] ",
    className
  );

  const myPortableTextComponents: any = {
    list: {
      bullet: ({ children }: { children: React.ReactNode }) => (
        <ul className="list-disc">{children}</ul>
      ),
      number: ({ children }: { children: React.ReactNode }) => (
        <ol className="list-decimal">{children}</ol>
      ),
    },
    block: {
      h1: ({ children }: any) => <h1>{children}</h1>,
      h2: ({ children }: any) => {
        const text = getTextFromChildren(children);
        const id = slugify(text);
        return <h2 id={id}>{children}</h2>;
      },
      h3: ({ children }: any) => <h3>{children}</h3>,
      h4: ({ children }: any) => <h4>{children}</h4>,
      h5: ({ children }: any) => <h5>{children}</h5>,
      h6: ({ children }: any) => <h6>{children}</h6>,
      normal: ({ children }: any) => (
        <p className="text-lg font-inter sm:text-2xl">{children}</p>
      ),
    },
    marks: {
      link: ({
        value,
        children,
      }: {
        value: any;
        children: React.ReactNode;
      }) => {
        const internal = /^\/(?!\/)/.test(value.href);

        if (internal) return <Link href={value.href}>{children}</Link>;

        return (
          <a href={value.href} target="_blank" rel="noreferrer noopener">
            {children}
          </a>
        );
      },
      textColor: ({
        value,
        children,
      }: {
        value: any;
        children: React.ReactNode;
      }) => <span style={{ color: value.value }}>{children}</span>,
      highlightedText: ({ children }: { children: React.ReactNode }) => (
        <span
          className={cn(
            "text-xl font-bold sm:text-3xl",
            highlightedTextClassName
          )}
        >
          {children}
        </span>
      ),
    },
    types: {
      image: ({ value }: any) => {
        return (
          <figure>
            {value && (
              <SanityImage
                src={value}
                alt={value.alt || "Bar "}
                width={1000}
                height={1000}
                className="m-0 max-h-[500px] w-full object-contain"
              />
            )}
            {value.alt && (
              <figcaption className="pl-2 text-sm border-l-2 border-safety-yellow text-ink-black">
                {value.alt}
              </figcaption>
            )}
          </figure>
        );
      },
    },
    styledTable: ({ value }: any) => (
      <table>
        <tbody>
          {value.rows?.map((row: any, i: number) => (
            <tr key={i}>
              {row.cells?.map((cellValue: any, j: number) => (
                <td
                  key={j}
                  style={{
                    backgroundColor: cellValue?.cellColor?.value,
                    color: cellValue?.textColor?.value,
                  }}
                >
                  <PortableText value={cellValue} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ),
  };

  return (
    <div className={combinedClassNames}>
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  );
};

export default RichText;
