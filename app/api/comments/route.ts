import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("comments")
    .select("id, author_name, content, created_at, parent_id, likes")
    .eq("post_slug", slug)
    .eq("approved", true)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comments: data });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { slug, author_name, author_email, content, parent_id } = body ?? {};

  if (!slug || !author_name?.trim() || !author_email?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "slug, author_name, author_email, and content are required" }, { status: 400 });
  }
  if (author_name.length > 100 || author_email.length > 254 || content.length > 2000) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(author_email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  const { error } = await supabase.from("comments").insert({
    post_slug: slug,
    author_name: author_name.trim(),
    author_email: author_email.trim().toLowerCase(),
    content: content.trim(),
    ...(parent_id ? { parent_id } : {}),
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
