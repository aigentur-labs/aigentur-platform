import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    // Client (multi-tenant root)
    defineField({
      name: "client",
      title: "Client",
      type: "reference",
      to: [{ type: "client" }],
      validation: (Rule) => Rule.required(),
    }),

    // Post basics
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary used for SEO and previews.",
    }),

    // Main image
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),

    // Rich text body
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),

    // Single category (recommended)
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),

    // Metadata
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),

    defineField({
      name: "readingTime",
      title: "Estimated Reading Time (minutes)",
      type: "number",
      description: "Optional. Can be computed automatically by n8n.",
    }),

    // Status for workflow
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
    }),

    // Optional: AIgentur tagging
    defineField({
      name: "source",
      title: "Content Source",
      type: "string",
      options: {
        list: [
          { title: "AIgentur Automation", value: "ai" },
          { title: "Human Editor", value: "human" },
        ],
      },
      initialValue: "ai",
    }),
  ],
});
