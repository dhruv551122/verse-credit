/* eslint-disable */ import { cn, slugify } from "@/lib/utils";
import { SanityImage } from "@/sanity/sanityImage";
import { PortableText } from "next-sanity";
import Link from "next/link";
import React from "react";

interface Props {
  content: Array<any> | undefined;
  className?: string;
  highlightedTextClassName?: string;
}

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
    "prose max-w-none text-tuatara font-inter",
    className,
  );

  const myPortableTextComponents: any = {
    list: {
      bullet: ({ children }: { children: React.ReactNode }) => (
        <ul className="pl-8 mb-4 list-disc">{children}</ul>
      ),
      number: ({ children }: { children: React.ReactNode }) => (
        <ol className="pl-8 mb-4 list-decimal">{children}</ol>
      ),
    },
    block: {
      h1: ({ children }: any) => <h1 className="my-4 text-4xl">{children}</h1>,
      h2: ({ children }: any) => {
        const text = getTextFromChildren(children);
        const id = slugify(text);
        return (
          <h2
            id={id}
            className="my-4 text-2xl font-semibold md:text-3xl scroll-m-20"
          >
            {children}
          </h2>
        );
      },
      h3: ({ children }: any) => (
        <h3 className="my-4 text-xl font-semibold md:text-2xl">{children}</h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="my-4 text-[18px] font-semibold md:text-xl">
          {children}
        </h4>
      ),
      h5: ({ children }: any) => <h5 className="my-4 ">{children}</h5>,
      h6: ({ children }: any) => <h6 className="my-4 ">{children}</h6>,
      normal: ({ children }: any) => (
        <p className="mb-4 text-base leading-relaxed font-inter min-h-px">
          {children}
        </p>
      ),
      center: ({ children }: any) => <p className="text-center">{children}</p>,
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
          className={cn("font-semibold! text-[22px]", highlightedTextClassName)}
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
                alt={value.alt || "VerseCredit"}
                width={1000}
                height={1000}
                className="object-contain w-full m-0 max-h-125"
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
      styledTable: ({ value }: any) => {
        return (
          <table className="w-full mb-4 0 border border-gray-30 rounded-xl overflow-hidden">
            <tbody className="">
              {value.rows?.map((row: any, i: number) => {
                return (
                  <tr key={i}>
                    {row.cells?.map((cellValue: any, j: number) => {
                      return (
                        <td
                          key={j}
                          style={{
                            backgroundColor: cellValue?.bgColor?.value,
                            color: cellValue?.textColor?.value,
                          }}
                          className="p-2 "
                        >
                          <PortableText value={cellValue.content} />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      },
    },
  };

  return (
    <div className={combinedClassNames}>
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  );
};

export default RichText;
