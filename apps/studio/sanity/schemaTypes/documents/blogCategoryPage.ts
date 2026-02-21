import { Blocks } from "lucide-react";
import { defineField, defineType } from "sanity";

export const blogCategoryPage = defineType({
  name: "blogCategoryPage",
  title: "Blog Category Page",
  type: "document",
  icon: Blocks,
  groups: [
    { name: "seo", title: "Seo" },
    { name: "recommandedBlogs", title: "Recommanded Blogs" },
    { name: "otherCategories", title: "Other Categories" },
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
      name: "recommandedBlogsTitle",
      title: "Recommanded Blogs Title",
      type: "string",
      group: "recommandedBlogs",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "recommandedBlogs",
      title: "Recommanded BLogs",
      type: "array",
      group: "recommandedBlogs",
      of: [
        {
          type: "reference",
          to: [{ type: "blog" }],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "otherCategoriesTitle",
      title: "Other Categories title",
      type: "string",
      group: "otherCategories",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
