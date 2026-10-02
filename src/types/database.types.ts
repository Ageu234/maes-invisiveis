/**
 * Database schema definition for future Supabase integration (Phase 3).
 * Follows PostgreSQL & Supabase Row-Level Security best practices.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      stories: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          slug: string;
          title: string;
          subtitle: string | null;
          excerpt: string;
          body_content: string;
          document_ref: string;
          location: string;
          published_at: string | null;
          is_published: boolean;
          is_featured: boolean;
          cover_image_url: string;
          cover_image_alt: string;
          photographer_credit: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["stories"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["stories"]["Insert"]>;
      };
      institutional_sections: {
        Row: {
          id: string;
          key: string;
          title: string;
          content: string;
          metadata: Json | null;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["institutional_sections"]["Row"], "id" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["institutional_sections"]["Insert"]>;
      };
      contact_messages: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          phone_or_email: string;
          message: string;
          read: boolean;
        };
        Insert: Omit<Database["public"]["Tables"]["contact_messages"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
