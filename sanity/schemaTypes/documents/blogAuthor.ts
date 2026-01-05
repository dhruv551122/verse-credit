import { BookUser } from "lucide-react";
import { defineField, defineType } from "sanity";

const blogAuthor = defineType({
  name: "blogAuthor",
  title: "Blog Author",
  type: "document",
  icon: BookUser,
  fields: [
    defineField({
      name: "authorName",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export default blogAuthor;
