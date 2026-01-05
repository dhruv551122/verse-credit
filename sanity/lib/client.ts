import { createClient } from "next-sanity";
import { token } from "./token";
import { projectId, dataset, apiVersion } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
