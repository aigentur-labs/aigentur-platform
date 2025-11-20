import { sanityClient } from "@/lib/sanity.client";
import { clientBySlugQuery } from "@/lib/queries";
import "@/app/globals.css";

type Props = {
  children: React.ReactNode;
  params: { clientSlug: string };
};

export default async function ClientLayout({ children, params }: Props) {
  const { clientSlug } = params;

  // Fetch the tenant settings
  const client = await sanityClient.fetch(clientBySlugQuery, { clientSlug });

  if (!client) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Client not found</h1>
      </main>
    );
  }

  // CSS variables
  const styleVars = {
    "--brand-color": client.brandColor || "#000000",
    "--accent-color": client.accentColor || "#555555",
  } as React.CSSProperties;

  return (
    <html lang="en">
      <body style={styleVars}>
        {children}
      </body>
    </html>
  );
}
