import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "../env";
import { token } from "./token";

console.log(apiVersion, dataset, projectId);

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
