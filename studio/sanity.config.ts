import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import {deskStructure} from './deskStructure'

export default defineConfig({
  name: "default",
  title: "Aigentur Studio",

  projectId: "laby05pv",
  dataset: "production",

  basePath: "/",

  plugins: [
    deskTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
