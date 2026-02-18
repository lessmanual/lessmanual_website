import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BlogPost = {
  id: string;
  slug: string;
  title_pl: string;
  description_pl: string | null;
  content_pl: string | null;
  meta_description_pl: string | null;
  featured_image: string | null;
  primary_keyword: string | null;
  secondary_keywords: string[] | null;
  reading_time_minutes: number | null;
  word_count: number | null;
  status: "draft" | "published" | "scheduled" | "archived";
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category: string | null;
  tags: string[] | null;
  author: string | null;
};

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .or(`status.eq.published,and(status.eq.scheduled,published_at.lte.${now})`)
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data as BlogPost[];
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .or(`status.eq.published,and(status.eq.scheduled,published_at.lte.${now})`)
    .single();

  if (error) {
    return null;
  }

  return data as BlogPost;
}

export async function getAllSlugs(): Promise<string[]> {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .or(`status.eq.published,and(status.eq.scheduled,published_at.lte.${now})`);

  if (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }

  return data.map((post) => post.slug);
}
