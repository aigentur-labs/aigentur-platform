import { groq } from "next-sanity";

// Get all clients (used later for multi-domain setups)
export const allClientsQuery = groq`
  *[_type == "client"]{
    _id,
    name,
    "slug": slug.current,
    primaryDomain,
    blogDomain,
    brandColor,
    accentColor,
    "logoUrl": logo.asset->url
  }
`;

// Get one client by slug (used for theming)
export const clientBySlugQuery = groq`
  *[_type == "client" && slug.current == $clientSlug][0]{
    _id,
    name,
    "slug": slug.current,
    primaryDomain,
    blogDomain,
    brandColor,
    accentColor,
    "logoUrl": logo.asset->url,
    settings
  }
`;

// All posts for a tenant (filtered by clientSlug)
export const postsForClientQuery = groq`
  *[_type == "post"
    && client->slug.current == $clientSlug
    && status == "published"
  ] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage{
      asset->{url}
    },
    publishedAt,
    readingTime,
    "category": category->{
      _id,
      title,
      "slug": slug.current
    }
  }
`;

// Single post for a tenant (safe double-filter)
export const postBySlugQuery = groq`
  *[_type == "post"
    && client->slug.current == $clientSlug
    && slug.current == $postSlug
    && status == "published"
  ][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage{
      asset->{url}
    },
    publishedAt,
    readingTime,
    body,
    "category": category->{
      _id,
      title,
      "slug": slug.current
    },
    "client": client->{
      _id,
      name,
      "slug": slug.current,
      brandColor,
      accentColor,
      "logoUrl": logo.asset->url
    }
  }
`;

// Categories for a tenant
export const categoriesForClientQuery = groq`
  *[_type == "category"
    && client->slug.current == $clientSlug
  ] | order(title asc)
`;
