import { z } from "zod";

export const API_URL =process.env.NEXT_PUBLIC_API_URL || "https://cms-1-5ri5.onrender.com";

const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

const authorSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  bio: z.string().nullable().optional(),
});

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
});

const coverSchema = z.object({
  id: z.number(),
  url: z.string().nullable().optional(),
  alternativeText: z.string().nullable().optional(),
  formats: z
    .object({
      small: z.object({ url: z.string() }).optional(),
      medium: z.object({ url: z.string() }).optional(),
      large: z.object({ url: z.string() }).optional(),
      thumbnail: z.object({ url: z.string() }).optional(),
    })
    .nullable()
    .optional(),
});

const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  createdAt: z.string(),
  author: authorSchema.nullable().optional(),
  category: categorySchema.nullable().optional(),
  tags: z.array(tagSchema).optional(),
  cover: coverSchema.nullable().optional(),
});

const postsSchema = z.array(postSchema);

export async function getPosts() {
  const res = await fetch(`${API_URL}/api/posts?populate=*`, {
    headers: { "Content-Type": "application/json" },
  
     next: { revalidate: 30 }
  });

  if (!res.ok) throw new Error("Erreur de récupération des posts");

  const json = await res.json();
  const parsed = postsSchema.safeParse(json.data);

  if (!parsed.success) {
    console.error("Erreur de validation Zod :", parsed.error);
    throw new Error("Structure de données inattendue depuis Strapi");
  }

  parsed.data.forEach((post) => {
    const cover =
      post.cover?.formats?.small?.url ||
      post.cover?.url ||
      "Pas de cover";
    console.log(`🖼️ ${post.title} → cover: ${cover}`);
  });

  return parsed.data;
}
export async function getPostBySlug(slug: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`,
      {
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Erreur de récupération du post");

    const json = await res.json();
    const post = json.data?.[0];

    if (!post) return null;

    const attrs = post.attributes || {};

    return {
      id: post.id,
      ...attrs,
      title:post.title,
      content:post.content,
      cover: "http://localhost:1337/uploads/"+post.cover.name,
      author: attrs.author?.data ? attrs.author.data.attributes : null,
      category: attrs.category?.data ? attrs.category.data.attributes : null,
      tags: attrs.tags?.data
        ? attrs.tags.data.map((t: any) => t.attributes)
        : [],
    };
  } catch (error) {
    console.error("❌ Erreur getPostBySlug :", error);
    return null;
  }
}

