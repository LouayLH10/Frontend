# 📰 Next.js Blog — Frontend (with Strapi CMS)

Ce projet est un **blog moderne** construit avec **Next.js (App Router, TypeScript)** et connecté à un backend **Strapi (TypeScript)** déployé sur Render.  
Il inclut la gestion de contenu dynamique, le SEO, un formulaire d’abonnement à la newsletter, et l’ISR pour une performance optimale.

---

## 🚀 Fonctionnalités principales

### 🧱 Contenu
- **Types Strapi** : `Post`, `Category`, `Tag`, `Author`, `Newsletter`
- Gestion de contenu avec **slug**, **relations**, **brouillons/publication**
- Données récupérées via l’API REST de Strapi

### 💡 Frontend
- **Next.js App Router** (v14+ avec TypeScript)
- **Pages dynamiques** :
  - `/` → Derniers articles  
  - `/posts/[slug]` → Détail d’un article  
  - `/categories/[slug]`, `/tags/[slug]`, `/authors/[slug]`
- **Recherche** d’articles
- **Formulaire Newsletter** avec `React Hook Form` + `Zod`, connecté à Strapi

### ⚡ Performance & UX
- **next/image** pour les images hébergées sur Strapi  
- **Pagination** et **temps de lecture** automatique  
- **Dark mode** via **Zustand/Context API**  
- **ISR (Incremental Static Regeneration)** :  
  Les articles se mettent à jour automatiquement après publication dans Strapi  
  grâce à un **webhook Strapi → Vercel**.

### 🔍 SEO & Accessibilité
- Balises **meta dynamiques** (`title`, `description`, `og:image`, `twitter:card`)  
- Génération automatique de :
  - `sitemap.xml`
  - `rss.xml`
- **Open Graph** et **Twitter Card** pour le partage social

---

## 🧩 Technologies utilisées

| Stack | Outils principaux |
|-------|-------------------|
| **Framework** | [Next.js 14+ (App Router)](https://nextjs.org/docs) |
| **Langage** | TypeScript |
| **Formulaire** | React Hook Form + Zod |
| **Animation** | Framer Motion |
| **État global / Thème** | Zustand |
| **CMS** | [Strapi 5 (TypeScript)](https://strapi.io/) |
| **Déploiement** | [Vercel](https://vercel.com) |
| **Images** | next/image (avec Strapi Media) |

---

## ⚙️ Installation locale

### 1. Cloner le dépôt
```bash
git clone https://github.com/LouayLH10/Frontend.git
cd Frontend
```
### 2. Installer les dépendances
```bash
npm install
```
### 2. Configurer les variables d’environnement
NEXT_PUBLIC_API_URL=https://cms-1-5ri5.onrender.com
 # ⚙️ Démarrage du serveur

En mode développement :
```bash
npm run develop
```
En mode Production:
```bash
npm run build && npm run start
```
Le serveur tourne par défaut sur :
👉 http://localhost:3000
