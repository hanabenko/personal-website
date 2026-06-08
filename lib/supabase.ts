import { createClient } from "@supabase/supabase-js";

export interface Comment {
  id: string;
  post_slug: string;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  parent_id: string | null;
  likes: number;
}

export function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error("Supabase env vars not set");
  return createClient(url, key);
}
