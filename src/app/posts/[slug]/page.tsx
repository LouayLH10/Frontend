// src/app/posts/[slug]/page.tsx
import PostClient from "@/app/components/PostClient";
import { getPostBySlug } from "@/lib/strapi";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // ✅ Nouvelle syntaxe Next.js 15+
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  // ✅ Gestion du cas où le post n’existe pas
  if (!post) {
    return {
      title: "Post Not Found",
      description: "Cet article est introuvable ou supprimé.",
    };
  }

  return {
    title: post.title || "Post sans titre",
    description: post.content?.slice(0, 150) || "Aucune description disponible.",
    openGraph: {
      title: post.title,
      description: post.content?.slice(0, 150),
      images: [
        {
          url: post.cover?.url || "/default-og.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.content?.slice(0, 150),
      images: [post.cover?.url || "/default-og.jpg"],
    },
  };
}

export default function Page() {
  return <PostClient />;
}
