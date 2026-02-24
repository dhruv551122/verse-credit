import { LucidePhoneOutgoing } from "lucide-react";
import { defineField, defineType } from "sanity";

export const contactUs = defineType({
  name: "contact_us",
  title: "Contact Us",
  type: "document",
  icon: LucidePhoneOutgoing,
  groups: [
    {
      name: "seo",
      title: "Seo",
    },
    {
      name: "contact",
      title: "Contact",
    },
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
      name: "contactTitle",
      type: "string",
      title: "Contact Title",
      group: "contact",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactDescription",
      type: "string",
      title: "Contact Description",
      group: "contact",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "formTitle",
      type: "string",
      title: "Form Title",
      group: "contact",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
