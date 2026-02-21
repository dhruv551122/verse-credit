import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      validation: (rule) => [
        rule.warning("A page title is required"),
        rule.max(60).warning("No more than 60 characters"),
        rule.required(),
      ],
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      validation: (rule) => [
        rule.warning("A description is required"),
        rule.max(160).warning("No more than 160 characters"),
        rule.required(),
      ],
    }),
  ],
});
