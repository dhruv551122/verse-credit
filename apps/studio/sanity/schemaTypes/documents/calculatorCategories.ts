import { orderRankField } from "@sanity/orderable-document-list";
import { Blocks } from "lucide-react";
import { defineField, defineType } from "sanity";

export const calculatorCategory = defineType({
  name: "calculatorCategory",
  title: "Calculator Category",
  type: "document",
  icon: Blocks,
  groups: [
    {
      name: "seo",
      title: "Seo",
    },
    { name: "category", title: "Category" },
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
      group: "category",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagLine",
      type: "string",
      title: "Tag Line",
      group: "category",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "string",
      group: "category",
      validation: (Rule) => Rule.required(),
    }),
    orderRankField({ type: "calculatorCategory" }),
  ],
});
