import { orderRankField } from "@sanity/orderable-document-list";
import { NotebookTabs } from "lucide-react";
import { defineField, defineType } from "sanity";

const blogCategory = defineType({
  name: "blogCategory",
  title: "Blog Category",
  type: "document",
  icon: NotebookTabs,
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      validation: (Rule) => Rule.required(),
    }),
    orderRankField({ type: "blogCategory" }),
  ],
});

export default blogCategory;
