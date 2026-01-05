"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes, singletonType } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { media } from "sanity-plugin-media";
import { simplerColorInput } from "sanity-plugin-simpler-color-input";

const singletonTypes = new Set<string>([...singletonType]);

const singletonActions = new Set<string>([
  "publish",
  "discardChanges",
  "restore",
]);

export default defineConfig({
  name: "verse-credit",
  title: "VerseCredit",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    media(),
    simplerColorInput({
      defaultColorFormat: "rgba",
      defaultColorList: [
        { label: "Dark Aquamarine Green", value: "#034540" },
        { label: "Oracle", value: "#39726c" },
        { label: "Isabelline", value: "#f4f2ec" },
        { label: "Dull White", value: "#edeadf" },
        { label: "red", value: "#ff1914" },
        { label: "green", value: "#3baa60" },
        { label: "black", value: "#000" },
        { label: "white", value: "#fff" },
      ],
      enableSearch: true,
      showColorValue: true,
    }),
  ]
});
