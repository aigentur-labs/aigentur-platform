import { defineType, defineField } from "sanity";

export default defineType({
  name: "client",
  title: "Client",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Client slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 64,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryDomain",
      title: "Primary domain",
      type: "string",
      description: "e.g. example.com",
    }),
    defineField({
      name: "blogDomain",
      title: "Blog domain",
      type: "string",
      description: "e.g. blog.example.com",
    }),
  ],
});