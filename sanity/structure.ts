import {File, LucideIcon} from "lucide-react";
import type {StructureBuilder, StructureResolver} from "sanity/structure";
import {multiTypes, SchemaType, singletonType, SingletonType, MultiType} from "./schemaTypes";
import {documents} from "./schemaTypes/documents";
import { getTitleCase } from "@/utils";


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

const createSingleTon = ({S, type, title, icon}: CreateSingleTon) => {
  const schemaTitle = getSchemaTitle(type);
  const schemaIcon = getSchemaIcon(type);
  const newTitle = title ?? schemaTitle ?? getTitleCase(type);

  return S.listItem()
    .title(newTitle)
    .icon(icon ?? schemaIcon ?? File)
    .child(S.document().schemaType(type).documentId(type));
};

type CreateMultiType = {
  S: StructureBuilder;
} & Base<MultiType>;

const createMultiType = ({S, type, id, title, icon}: CreateMultiType) => {
  const schemaTitle = getSchemaTitle(type);
  const schemaIcon = getSchemaIcon(type);
  const newTitle = title ?? schemaTitle ?? getTitleCase(type);

  return S.documentTypeListItem(type)
    .id(id ?? type)
    .title(newTitle)
    .icon(icon ?? schemaIcon ?? File);
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content Management")
    .items([
      ...singletonType.map((type) => createSingleTon({S, type})),
      S.divider(),
      ...multiTypes.map((type) => createMultiType({S, type})),
    ]);
