import { Settings } from "lucide-react";
import { defineField, defineType } from "sanity";

export const settings = defineType({
  name: "settings",
  type: "document",
  title: "Settings",
  icon: Settings,
  groups: [
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "headerLogo",
      type: "image",
      title: "Header Logo",
      group: "header",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headerLinks",
      type: "array",
      title: "Header Links",
      group: "header",
      of: [
        {
          type: "link",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerLogo",
      title: "Footer Logo",
      type: "image",
      group: "footer",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "socialMediaLinks",
      title: "Social Media Links",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "link",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "url.label",
              media: "logo",
            },
            prepare({ title, media }) {
              return {
                title: title || "Social media link.",
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerLinks",
      type: "array",
      title: "Footer Links",
      group: "footer",
      of: [
        {
          type: "link",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
