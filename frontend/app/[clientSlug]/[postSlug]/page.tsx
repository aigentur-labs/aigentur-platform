import { sanityClient } from "@/lib/sanity.client";
import { postBySlugQuery } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents"; // ← ADD THIS
import Image from "next/image";
import Link from "next/link";

type PageProps = {
  params: {
    clientSlug: string;
    postSlug: string;
  };
};

export default async function PostPage({ params }: PageProps) {
  const { clientSlug, postSlug } = params;

  // Fetch the post — includes client theme inside
  const post = await sanityClient.fetch(postBySlugQuery, {
    clientSlug,
    postSlug,
  });

  if (!post) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Post not found</h1>
        <p>This post does not exist for this client.</p>
      </main>
    );
  }

  const client = post.client;
  const brandColor = client?.brandColor || "#000";

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {/* Back link */}
      <p style={{ marginBottom: "1.5rem" }}>
        <Link href={`/${clientSlug}`} style={{ color: brandColor }}>
          ← Back to {client.name} Blog
        </Link>
      </p>

      {/* Title */}
      <h1 style={{ marginTop: 0 }}>{post.title}</h1>

      {/* Meta */}
      <p style={{ color: "#666", marginBottom: "1rem" }}>
        {post.publishedAt &&
          new Date(post.publishedAt).toLocaleDateString("de-CH")}
        {post.readingTime ? ` • ${post.readingTime} min read` : ""}
        {post.category ? ` • ${post.category.title}` : ""}
      </p>

      {/* Main Image */}
      {post.mainImage?.asset?.url && (
        <div
          style={{
            marginBottom: "1.5rem",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <Image
            src={post.mainImage.asset.url}
            alt={post.title}
            width={1200}
            height={700}
          />
        </div>
      )}

      {/* Body */}
      <div
        style={{
          fontSize: "1.05rem",
          lineHeight: "1.7",
          color: "#222",
        }}
      >
        <PortableText
          value={post.body}
          components={portableTextComponents} // ← USE IT HERE
        />
      </div>
    </main>
  );
}
