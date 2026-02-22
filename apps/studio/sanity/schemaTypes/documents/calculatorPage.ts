import { Calculator } from "lucide-react";
import { defineField, defineType } from "sanity";

export const calculatorPage = defineType({
  name: "calculatorPage",
  title: "Calculator Page",
  type: "document",
  icon: Calculator,
  groups: [
    { name: "seo", title: "Seo" },
    { name: "page", title: "Page" },
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
      name: "calculatorPageTitle",
      title: "Calculator Page Title",
      type: "string",
      group: "page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "calculatorPageTagLine",
      title: "Calculator Page Tag Line",
      type: "text",
      group: "page",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
