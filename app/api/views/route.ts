import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { slug } = body ?? {};
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const supabase = getSupabaseClient();

  const { data: existing } = await supabase
    .from("post_views")
    .select("view_count")
    .eq("slug", slug)
    .single();

  const newCount = (existing?.view_count ?? 0) + 1;

  await supabase.from("post_views").upsert({ slug, view_count: newCount });

  return NextResponse.json({ views: newCount });
}
