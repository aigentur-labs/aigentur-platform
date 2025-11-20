import { sanityClient } from "@/lib/sanity.client";
import {
  clientBySlugQuery,
  postsForClientQuery,
  categoriesForClientQuery,
} from "@/lib/queries";
import Link from "next/link";

type PageProps = {
  params: { clientSlug: string };
};

export default async function ClientBlogPage({ params }: PageProps) {
  const { clientSlug } = params;

  // Fetch client, posts, categories in parallel
  const [client, posts, categories] = await Promise.all([
    sanityClient.fetch(clientBySlugQuery, { clientSlug }),
    sanityClient.fetch(postsForClientQuery, { clientSlug }),
    sanityClient.fetch(categoriesForClientQuery, { clientSlug }),
  ]);

  if (!client) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Client not found</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ margin: 0, color: client.brandColor || "#000" }}>
          {client.name}
        </h1>
        <p style={{ color: "#666" }}>Blog</p>
      </header>

      {/* Category list (optional) */}
      {categories.length > 0 && (
        <nav style={{ marginBottom: "2rem" }}>
          {categories.map((cat: any) => (
            <span
              key={cat._id}
              style={{
                marginRight: "1rem",
                padding: "0.2rem 0.6rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "0.9rem",
              }}
            >
              {cat.title}
            </span>
          ))}
        </nav>
      )}

      {/* Posts */}
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {posts.map((post: any) => (
            <article
              key={post._id}
              style={{
                border: "1px solid #eee",
                borderRadius: "10px",
                padding: "1.5rem",
              }}
            >
              <Link href={`/${clientSlug}/${post.slug}`}>
                <h2 style={{ marginTop: 0 }}>{post.title}</h2>
              </Link>

              {post.excerpt && (
                <p style={{ color: "#555" }}>{post.excerpt}</p>
              )}

              <Link
                href={`/${clientSlug}/${post.slug}`}
                style={{ color: client.brandColor || "blue" }}
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
