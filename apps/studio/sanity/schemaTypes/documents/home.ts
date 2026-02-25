import { Home } from "lucide-react";
import { defineField, defineType } from "sanity";

const home = defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: Home,
  groups: [
    { name: "seo", title: "Seo" },
    { name: "hero", title: "Hero" },
    { name: "categoryGroups", title: "Category Groups" },
    { name: "news", title: "News" },
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
      name: "heroLeftTitle",
      title: "Hero Left Title",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroRightTitle",
      title: "Hero Right Title",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroRightBlogs",
      title: "Hero Right Blogs",
      type: "array",
      group: "categoryGroups",
      of: [
        {
          type: "reference",
          to: [{ type: "blog" }],
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoryGroup",
      title: "Category Group",
      type: "array",
      group: "categoryGroups",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "categories",
              title: "Categories",
              type: "array",
              of: [
                {
                  type: "reference",
                  to: [{ type: "blogCategory" }],
                  validation: (Rule) => Rule.required(),
                },
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newsTitle",
      title: "News Title",
      type: "string",
      group: "news",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newsBackgroundImage",
      title: "New Background Image",
      type: "image",
      group: "news",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "newsBlogs",
      title: "News blogs",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "blog" }],
          validation: (Rule) => Rule.required(),
        },
      ],
      group: "news",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export default home;
