"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { API_URL } from "@/lib/strapi";
import NewsletterForm from "./newletterForm";

export default function AnimatedPosts({ posts }: { posts: any[] }) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-gray-900 dark:text-white"
      >
        📰 Derniers articles
      </motion.h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Aucun article pour le moment.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any, index: number) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {post.cover?.url && (
                <div className="relative w-full h-52 overflow-hidden">
                  <Image
                    src={`${API_URL}${post.cover.url}`}
                    alt={post.cover?.alternativeText || post.title}
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
              )}

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.content.slice(0, 140)}...
                  </p>
                </div>

                <div className="mt-auto space-y-3">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>✍️ {post.author?.name || "Inconnu"}</span>
                    <span>📂 {post.category?.name || "Non spécifiée"}</span>
                  </div>

                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: any) => (
                        <span
                          key={tag.id}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/posts/${post.slug}`}
                    className="inline-block mt-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Lire la suite →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-20 flex justify-center"
      >
        <div className="w-full max-w-lg">
          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
            ✉️ Abonnez-vous à notre Newsletter
          </h3>
          <NewsletterForm />
        </div>
      </motion.section>
    </main>
  );
}
