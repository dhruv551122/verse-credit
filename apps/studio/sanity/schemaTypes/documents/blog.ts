import { orderRankField } from "@sanity/orderable-document-list";
import { BookOpen } from "lucide-react";
import { defineField, defineType } from "sanity";

const blog = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  icon: BookOpen,
  groups: [
    { name: "seo", title: "Seo" },
    { name: "blog", title: "Blog" },
  ],
  fields: [
    defineField({
      name: "seo",
      type: "seo",
      title: "Seo",
      group: "seo",
      validation: (Rule) => Rule.required(),
    }),
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "blog",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      group: "blog",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "blog",
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
      name: "content",
      title: "Content",
      type: "blockContent",
      group: "blog",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "blog",
      to: [{ type: "blogAuthor" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "blog",
      to: [{ type: "blogCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "uplodedAt",
      title: "Uploaded At",
      type: "datetime",
      group: "blog",
    }),
    defineField({
      name: "postedToX",
      title: "Posted To X",
      type: "boolean",
      group: "blog",
    }),
    defineField({
      name: "xPostStatus",
      title: "Posted To X",
      type: "string",
      group: "blog",
    }),
    orderRankField({ type: "blog" }),
  ],
  preview: {
    select: {
      title: "title",
      media: "heroImage",
      category: "category.label",
    },
    prepare(selection) {
      const { title, media, category } = selection;

      return {
        title: title,
        subtitle: category || "No Categories",
        media: media,
      };
    },
  },
});

export default blog;
