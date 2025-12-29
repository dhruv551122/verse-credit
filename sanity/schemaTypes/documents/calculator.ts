import { defineField, defineType } from "sanity";

export const calculator = defineType({
  name: "calculator",
  title: "Calculator",
  type: "document",
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
      name: "description",
      type: "string",
      title: "Description",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "string",
      title: "Slug",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
