import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Aigentur Studio",
  projectId: "laby05pv",
  dataset: "production",
  basePath: "/",
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});