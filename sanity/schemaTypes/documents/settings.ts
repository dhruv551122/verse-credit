import { Settings } from "lucide-react";
import { defineField, defineType } from "sanity";

export const settings = defineType({
    name: 'settings',
    type: 'document',
    title: 'Settings',
    icon: Settings,
    fields: [
        defineField({
            name: 'headerLinks',
            type: 'array',
            title: 'Header Links',
            of: [
                {
                    type: 'link',
                    validation: (Rule) => Rule.required()
                }
            ],
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'footerLinks',
            type: 'array',
            title: 'Footer Links',
            of: [
                {
                    type: 'link',
                    validation: (Rule) => Rule.required()
                }
            ],
            validation: (Rule) => Rule.required()
        }),
    ]
}) 