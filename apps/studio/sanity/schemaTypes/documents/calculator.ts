import { orderRankField } from "@sanity/orderable-document-list";
import { CalculatorIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const calculator = defineType({
  name: "calculator",
  title: "Calculator",
  type: "document",
  icon: CalculatorIcon,
  groups: [
    { name: "seo", title: "Seo" },
    { name: "calculator", title: "Calculator" },
  ],
  fields: [
    defineField({
      name: "seo",
      title: "Seo",
      type: "seo",
      group: "seo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      group: "calculator",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      type: "image",
      title: "Icon",
      group: "calculator",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagLine",
      type: "text",
      title: "Tag Line",
      group: "calculator",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      group: "calculator",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
      group: "calculator",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutCalculator",
      title: "About Calculator",
      type: "blockContent",
      group: "calculator",
    }),
    orderRankField({ type: "calculator" }),
  ],
});
