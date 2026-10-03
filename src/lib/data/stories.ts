import { getPublicSupabaseClient } from "@/lib/supabase/public";
import { INITIAL_STORIES } from "@/lib/content";
import { Story } from "@/types/content";
import { Database } from "@/types/database";

type StoryRow = Database["public"]["Tables"]["stories"]["Row"];

function mapStoryRowToStory(row: StoryRow): Story {
  // Converte texto em parágrafos separados por quebras de linha duplas
  const contentParagraphs = row.content
    ? row.content
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle || "",
    excerpt: row.summary,
    date: row.published_at
      ? new Date(row.published_at).getFullYear().toString()
      : "",
    location: row.location || "",
    documentRef: row.document_ref || "",
    featuredImage: row.cover_image || "/media/adalgiza-e-filho-documental.jpg",
    featuredImageAlt:
      row.cover_image_alt ||
      row.title,
    content: contentParagraphs.length > 0 ? contentParagraphs : [row.summary],
    photographerCredit: row.photographer_credit || "",
    tags: row.tags && row.tags.length > 0 ? row.tags : [],
    isFeatured: row.is_featured ?? false,
  };
}

/**
 * Obtém todas as histórias públicas (apenas status = 'published').
 * Faz fallback resiliente para as histórias iniciais caso o Supabase
 * não esteja configurado ou ocorra qualquer erro de rede.
 */
export async function getPublishedStories(): Promise<Story[]> {
  try {
    const supabase = getPublicSupabaseClient();
    if (!supabase) {
      return INITIAL_STORIES;
    }

    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return INITIAL_STORIES;
    }

    return data.map(mapStoryRowToStory);
  } catch (err) {
    console.warn("Aviso ao ler histórias do Supabase (a utilizar fallback local):", err);
    return INITIAL_STORIES;
  }
}

/**
 * Obtém uma história pública pelo seu slug.
 */
export async function getPublishedStoryBySlug(slug: string): Promise<Story | null> {
  try {
    const supabase = getPublicSupabaseClient();
    if (!supabase) {
      return INITIAL_STORIES.find((s) => s.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) {
      return INITIAL_STORIES.find((s) => s.slug === slug) || null;
    }

    return mapStoryRowToStory(data);
  } catch (err) {
    console.warn(`Aviso ao ler história "${slug}" do Supabase:`, err);
    return INITIAL_STORIES.find((s) => s.slug === slug) || null;
  }
}
