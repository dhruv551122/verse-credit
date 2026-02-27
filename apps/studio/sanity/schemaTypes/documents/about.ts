import { BookUser } from "lucide-react";
import { defineField, defineType } from "sanity";

const aboutUs = defineType({
  name: "aboutUs",
  title: "About Us",
  type: "document",
  icon: BookUser,
  groups: [
    { name: "seo", title: "Seo" },
    { name: "hero", title: "Hero" },
    { name: "aboutAndPurpose", title: "About and Purpose" },
    { name: "whatWeOffer", title: "What We Offer" },
    { name: "ourPhilosophyAndVision", title: "Our Philosophy And Vision" },
    { name: "clarification", title: "Clarification" },
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
      name: "herobannerTitle",
      title: "Herobanner Title",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "herobannerImage",
      title: "Herobanner Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      group: "hero",
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "aboutTitle",
      title: "About Title",
      type: "string",
      group: "aboutAndPurpose",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutContent",
      title: "About Content",
      type: "blockContent",
      group: "aboutAndPurpose",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "purposeTitle",
      title: "Purpose Title",
      type: "string",
      group: "aboutAndPurpose",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "purposeContent",
      title: "Purpose Content",
      type: "blockContent",
      group: "aboutAndPurpose",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatWeOfferTitle",
      title: "What We Offer Title",
      type: "string",
      group: "whatWeOffer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatWeOfferItems",
      title: "What We Offer Items",
      type: "array",
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
              name: "content",
              title: "Content",
              type: "blockContent",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
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
          ],
        },
      ],
      group: "whatWeOffer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ourPhilosophyAndVisionItems",
      title: "Our Philosophy And Vision Items",
      type: "array",
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
              name: "content",
              title: "Content",
              type: "blockContent",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
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
          ],
        },
      ],
      group: "ourPhilosophyAndVision",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clarificationTitle",
      title: "Clarification Title",
      type: "string",
      group: "clarification",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clarificationContent",
      title: "Clarification Content",
      type: "blockContent",
      group: "clarification",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export default aboutUs;
