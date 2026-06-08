import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { id } = body ?? {};
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = getSupabaseClient();

  const { data: row, error: fetchErr } = await supabase
    .from("comments")
    .select("likes")
    .eq("id", id)
    .single();
  if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 });

  const newLikes = (row.likes ?? 0) + 1;
  const { error: updateErr } = await supabase
    .from("comments")
    .update({ likes: newLikes })
    .eq("id", id);
  if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 });

  return NextResponse.json({ likes: newLikes });
}
