import { defineType, defineField } from "sanity";

export default defineType({
  name: "client",
  title: "Client",
  type: "document",
  fields: [
    // Basic identity
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Client Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 64,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Their main domain (optional)
    defineField({
      name: "primaryDomain",
      title: "Primary Domain",
      type: "url",
      description: "Example: https://example.com",
    }),

    // Subdomain we will publish the AIgentur blog on
    defineField({
      name: "blogDomain",
      title: "Blog Domain",
      type: "url",
      description: "Example: https://blog.example.com",
    }),

    // Optional brand fields for styling
    defineField({
      name: "brandColor",
      title: "Brand Color",
      type: "string",
      description: "Hex color (e.g. #0055ff)",
    }),

    defineField({
      name: "accentColor",
      title: "Secondary/Accent Color",
      type: "string",
      description: "Optional, e.g. #ff9900",
    }),

    defineField({
      name: "logo",
      title: "Client Logo",
      type: "image",
      options: { hotspot: true },
    }),

    // Optional settings object — useful for future custom layouts
    defineField({
      name: "settings",
      title: "Layout Settings",
      type: "object",
      fields: [
        defineField({
          name: "headerStyle",
          title: "Header Style",
          type: "string",
          options: {
            list: [
              { title: "Minimal", value: "minimal" },
              { title: "Centered", value: "centered" },
              { title: "Bold", value: "bold" },
            ],
          },
        }),
      ],
    }),
  ],
});
