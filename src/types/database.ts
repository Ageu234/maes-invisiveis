export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type StoryStatus = "draft" | "published";
export type MessageStatus = "unread" | "read" | "archived";
export type AdminRole = "admin";

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          role: AdminRole;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: AdminRole;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: AdminRole;
          created_at?: string;
        };
        Relationships: [];
      };
      stories: {
        Row: {
          id: string;
          title: string;
          slug: string;
          subtitle: string | null;
          summary: string;
          content: string;
          cover_image: string | null;
          cover_image_alt: string | null;
          status: StoryStatus;
          published_at: string | null;
          seo_title: string | null;
          seo_description: string | null;
          location: string | null;
          document_ref: string | null;
          photographer_credit: string | null;
          tags: string[] | null;
          is_featured: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          subtitle?: string | null;
          summary: string;
          content: string;
          cover_image?: string | null;
          cover_image_alt?: string | null;
          status?: StoryStatus;
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          location?: string | null;
          document_ref?: string | null;
          photographer_credit?: string | null;
          tags?: string[] | null;
          is_featured?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          subtitle?: string | null;
          summary?: string;
          content?: string;
          cover_image?: string | null;
          cover_image_alt?: string | null;
          status?: StoryStatus;
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          location?: string | null;
          document_ref?: string | null;
          photographer_credit?: string | null;
          tags?: string[] | null;
          is_featured?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
          description: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          description?: string | null;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          description?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          status: MessageStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          status?: MessageStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string | null;
          message?: string;
          status?: MessageStatus;
          created_at?: string;
        };
        Relationships: [];
      };
      media: {
        Row: {
          id: string;
          file_name: string;
          file_path: string;
          public_url: string;
          mime_type: string | null;
          size_bytes: number | null;
          alt_text: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          file_name: string;
          file_path: string;
          public_url: string;
          mime_type?: string | null;
          size_bytes?: number | null;
          alt_text?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          file_name?: string;
          file_path?: string;
          public_url?: string;
          mime_type?: string | null;
          size_bytes?: number | null;
          alt_text?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
