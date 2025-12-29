import { Blocks } from "lucide-react";
import { defineField, defineType } from "sanity";

export const calculatorCategory = defineType({
  name: "calculatorCategory",
  title: "Calculator Category",
  type: "document",
  icon: Blocks,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagLine",
      type: "string",
      title: "Tag Line",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
