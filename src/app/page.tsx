import { getPosts } from "@/lib/strapi";
import AnimatedPosts from "./components/AnimatedPosts";

export const revalidate = 30;

export default async function Home() {
  try {
    const posts = await getPosts();

    if (!posts || posts.length === 0) {
      return <p className="text-center mt-10">Aucun article disponible pour le moment.</p>;
    }

    return <AnimatedPosts posts={posts} />;
  } catch (error) {
    console.error("❌ Erreur lors du chargement des posts :", error);
    return <p className="text-center mt-10 text-red-500">Erreur de chargement des articles.</p>;
  }
}
