import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
  name: "client",
  title: "Client",
  type: "reference",
  to: [{ type: "client" }],
  validation: (Rule) => Rule.required(),

  // Automatically set correct client for logged-in user
  initialValue: async (_, context) => {
    const email = context.currentUser?.email;
    const client = await context.getClient().fetch(
      `*[_type == "client" && ownerUserEmail == $email][0]._id`,
      { email }
    );
    return client ? { _type: "reference", _ref: client } : undefined;
  },

  // Prevent users from changing it
  readOnly: ({ currentUser }) => {
    const isAdmin = currentUser?.roles?.some((r) => r.name === "administrator");
    return !isAdmin; // only admin can modify client assignment
  },
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
    //category
    defineField({
  name: "category",
  title: "Category",
  type: "reference",
  to: [{ type: "category" }],
  options: {
    filter: ({ currentUser }) => ({
      filter: "client->ownerUserEmail == $email",
      filterParams: { email: currentUser?.email },
    }),
  },
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
