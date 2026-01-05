import StyledTablePreview from "@/sanity/components/styledTablePreview";
import { defineType } from "sanity";

const styledTable = defineType({
  name: "styledTable",
  title: "Styled Table",
  type: "object",

  fields: [
    {
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "cells",
              title: "Cells",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "content",
                      title: "Cell Content",
                      type: "array",
                      of: [{ type: "block" }],
                    },
                    {
                      name: "bgColor",
                      title: "Background Color",
                      type: "textColor",
                    },
                    {
                      name: "textColor",
                      title: "Text Color",
                      type: "textColor",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      rows: "rows",
    },
  },
  components: {
    preview: StyledTablePreview,
  },
});

export default styledTable;
