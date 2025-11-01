"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { API_URL } from "@/lib/strapi";

export default function PostClient() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      fetch(`${API_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`)
        .then((res) => res.json())
        .then((data) => setPost(data.data?.[0]));
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        Post Not Found
      </div>
    );
  }

  const { title, content, cover, author, category, tags, createdAt } = post;

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* 🏷️ Catégorie */}
      {category && (
        <div className="text-sm text-blue-600 dark:text-blue-400 mb-2">
          📂 {category.name}
        </div>
      )}

      {/* 📰 Titre */}
      <h1 className="text-4xl font-bold mb-4 leading-tight">{title}</h1>

      {/* 👤 Auteur + date */}
      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <span>✍️ {author?.name || "Auteur inconnu"}</span>
        <span>•</span>
        <span>
          🕒 {new Date(createdAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      {/* 🖼️ Image principale */}
      {cover?.url && (
        <div className="relative w-full h-80 mb-10 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={`${API_URL}${cover.url}`}
            alt={cover?.alternativeText || title}
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
        </div>
      )}

      {/* 📝 Contenu */}
      <div
        className="prose dark:prose-invert max-w-none mb-10"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* 🏷️ Tags */}
      {tags && tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag: any) => (
            <span
              key={tag.id}
              className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      {/* 🔙 Retour */}
      <div className="mt-12">
        <a
          href="/"
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Retour à la liste des articles
        </a>
      </div>
    </article>
  );
}
