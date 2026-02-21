import { BookOpen, File, LucideIcon } from "lucide-react";
import {
  multiTypes,
  SchemaType,
  singletonType,
  SingletonType,
  MultiType,
} from "./schemaTypes";
import { documents } from "./schemaTypes/documents";
import { getTitleCase } from "../utils";
import {
  StructureBuilder,
  StructureResolver,
  StructureResolverContext,
} from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

type Base<T = SchemaType> = {
  id?: string;
  type: T;
  preview?: boolean;
  title?: string;
  icon?: LucideIcon;
};

type CreateSingleTon = {
  S: StructureBuilder;
} & Base<SingletonType>;

const getSchemaIcon = (type: string): LucideIcon | undefined =>
  documents.find((doc) => doc.name === type)?.icon as LucideIcon | undefined;

const getSchemaTitle = (type: string): string | undefined =>
  documents.find((doc) => doc.name === type)?.title;

const createSingleTon = ({ S, type, title, icon }: CreateSingleTon) => {
  const schemaTitle = getSchemaTitle(type);
  const schemaIcon = getSchemaIcon(type);
  const newTitle = title ?? schemaTitle ?? getTitleCase(type);

  return S.listItem()
    .title(newTitle)
    .icon(icon ?? schemaIcon ?? File)
    .child(S.document().schemaType(type).documentId(type));
};

const blogsByCategory = (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  return S.listItem()
    .title("Blogs By category")
    .icon(BookOpen)
    .child(
      S.documentTypeList("blogCategory")
        .title("Categories")
        .child((categoryId) =>
          S.list()
            .title("Blogs")
            .items([
              orderableDocumentListDeskItem({
                S,
                context,
                type: "blog",
                title: "Blog",
                filter: "_type == 'blog' && category._ref == $categoryId",
                params: { categoryId },
              }),
            ]),
        ),
    );
};

type CreateMultiType = {
  S: StructureBuilder;
  context: StructureResolverContext;
} & Base<MultiType>;

const createMultiType = ({
  S,
  type,
  id,
  title,
  icon,
  context,
}: CreateMultiType) => {
  const schemaTitle = getSchemaTitle(type);
  const schemaIcon = getSchemaIcon(type);
  const newTitle = title ?? schemaTitle ?? getTitleCase(type);

  return orderableDocumentListDeskItem({
    S,
    context,
    type,
    title: newTitle,
    id: id ?? type,
    icon: icon ?? schemaIcon ?? File,
  });
};

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content Management")
    .items([
      ...singletonType.map((type) => createSingleTon({ S, type })),
      S.divider(),
      blogsByCategory(S, context),
      createMultiType({ S, type: "blog", title: "All blogs", context }),
      S.divider(),
      ...multiTypes
        .filter((type) => type !== "blog")
        .map((type) => createMultiType({ S, type, context })),
    ]);
