import { defineField, defineType } from "sanity";

export const link = defineType({
    name: 'link',
    title: 'Link',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'url',
            title: 'URL',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'openInNewTab',
            title: 'Open In New Tab',
            type: 'boolean',
            validation: (Rule) => Rule.required()
        })
    ]
})