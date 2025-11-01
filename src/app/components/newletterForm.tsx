"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

// ✅ Validation avec Zod
const newsletterSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
  content: z.string().min(5, "Le message doit contenir au moins 5 caractères"),
});

type NewsletterData = z.infer<typeof newsletterSchema>;

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
  });

  // ✅ Soumission du formulaire
  const onSubmit = async (data: NewsletterData) => {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      setStatus("success");
      reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        📨 Rejoins notre newsletter
      </h2>

      {/* Champ email */}
      <div>
        <input
          type="email"
          {...register("email")}
          placeholder="Votre adresse e-mail"
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Champ message */}
      <div>
        <textarea
          {...register("content")}
          placeholder="Votre message..."
          rows={4}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        {errors.content && (
          <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
        )}
      </div>

      {/* Bouton */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {isSubmitting ? "Envoi..." : "Envoyer"}
      </button>

      {/* Messages de statut */}
      {status === "success" && (
        <p className="text-green-600 text-sm">✅ Merci ! Votre message a été envoyé.</p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm">❌ Une erreur est survenue. Réessayez.</p>
      )}
    </form>
  );
}
