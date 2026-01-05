import { AArrowUp, HighlighterIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const commonRichFields = [
  {
    title: "Block",
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "H1", value: "h1" },
      { title: "H2", value: "h2" },
      { title: "H3", value: "h3" },
      { title: "H4", value: "h4" },
      { title: "H5", value: "h5" },
      { title: "H6", value: "h6" },
      { title: "Quote", value: "blockquote" },
    ],
    lists: [
      { title: "Bullet", value: "bullet" },
      { title: "Numbered", value: "number" },
    ],
    marks: {
      decorators: [
        {
          title: "Strong",
          value: "strong",
        },
        { title: "Emphasis", value: "em" },
        {
          title: "Highlighted Text",
          value: "highlightedText",
          icon: () => <AArrowUp className="h-4 w-4" />,
          component: ({ children }: { children: React.ReactNode }) => (
            <span className="text-xl font-bold">{children}</span>
          ),
        },
      ],
      annotations: [
        {
          type: "textColor",
          name: "textColor",
          title: "Text Color",
          icon: () => <HighlighterIcon className="h-4 w-4" />,
          component: ({
            value,
            children,
          }: {
            value: string;
            children: React.ReactNode;
          }) => <span style={{ color: value }}>{children}</span>,
        },
        {
          title: "URL",
          name: "link",
          type: "object",
          fields: [
            defineField({
              name: "href",
              title: "URL",
              type: "url",
              validation: (Rule) =>
                Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
            }),
          ],
        },
      ],
    },
  },
];

const blockContent = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    ...commonRichFields,
    {
      name: "image",
      type: "image",
      options: {
        storeOriginalFilename: true,
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "table",
      type: "styledTable",
    },
  ],
});

export default blockContent;
