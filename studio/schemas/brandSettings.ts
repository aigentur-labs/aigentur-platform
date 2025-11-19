import { defineType, defineField } from "sanity";

export default defineType({
  name: "brandSettings",
  title: "Brand Settings",
  type: "document",
  fields: [
    defineField({
      name: "client",
      title: "Client",
      type: "reference",
      to: [{ type: "client" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryColor",
      title: "Primary color",
      type: "string",
      description: "Hex code, e.g. #0057FF",
    }),
    defineField({
      name: "secondaryColor",
      title: "Secondary color",
      type: "string",
    }),
    defineField({
      name: "headingFont",
      title: "Heading font",
      type: "string",
    }),
    defineField({
      name: "bodyFont",
      title: "Body font",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
  ],
});