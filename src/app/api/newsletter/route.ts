import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms-1-5ri5.onrender.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, content } = body;

    if (!email || !content) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const res = await fetch(`${STRAPI_URL}/api/newsletters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { email, content } }),
    });

    if (!res.ok) {
      const errData = await res.json();
      return NextResponse.json({ error: "Erreur Strapi", details: errData }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
