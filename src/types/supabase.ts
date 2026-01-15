/**
 * Supabase Database Types
 * Generated from database schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string | null
          company: string | null
          industry: string | null
          message: string | null
          source: string
          status: string
          hot_lead_score: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          industry?: string | null
          message?: string | null
          source?: string
          status?: string
          hot_lead_score?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          industry?: string | null
          message?: string | null
          source?: string
          status?: string
          hot_lead_score?: number | null
        }
      }
      roi_calculations: {
        Row: {
          id: string
          created_at: string
          email: string | null
          specialization: string
          hours_per_month: number
          hourly_rate: number
          potential_savings: number
          hot_lead_score: number
        }
        Insert: {
          id?: string
          created_at?: string
          email?: string | null
          specialization: string
          hours_per_month: number
          hourly_rate: number
          potential_savings: number
          hot_lead_score?: number
        }
        Update: {
          id?: string
          created_at?: string
          email?: string | null
          specialization?: string
          hours_per_month?: number
          hourly_rate?: number
          potential_savings?: number
          hot_lead_score?: number
        }
      }
      chatbot_conversations: {
        Row: {
          id: string
          created_at: string
          session_id: string
          messages: Json[]
          specialization: string | null
          queries_per_day: string | null
          budget: string | null
          outcome: string | null
          email: string | null
          phone: string | null
          hot_lead_score: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          session_id: string
          messages: Json[]
          specialization?: string | null
          queries_per_day?: string | null
          budget?: string | null
          outcome?: string | null
          email?: string | null
          phone?: string | null
          hot_lead_score?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          session_id?: string
          messages?: Json[]
          specialization?: string | null
          queries_per_day?: string | null
          budget?: string | null
          outcome?: string | null
          email?: string | null
          phone?: string | null
          hot_lead_score?: number | null
        }
      }
      blog_posts: {
        Row: {
          id: string
          slug: string
          title_pl: string
          description_pl: string | null
          content_pl: string
          meta_description_pl: string | null
          title_en: string | null
          description_en: string | null
          content_en: string | null
          meta_description_en: string | null
          featured_image: string | null
          primary_keyword: string | null
          secondary_keywords: string[] | null
          reading_time_minutes: number
          word_count: number | null
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title_pl: string
          description_pl?: string | null
          content_pl: string
          meta_description_pl?: string | null
          title_en?: string | null
          description_en?: string | null
          content_en?: string | null
          meta_description_en?: string | null
          featured_image?: string | null
          primary_keyword?: string | null
          secondary_keywords?: string[] | null
          reading_time_minutes?: number
          word_count?: number | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title_pl?: string
          description_pl?: string | null
          content_pl?: string
          meta_description_pl?: string | null
          title_en?: string | null
          description_en?: string | null
          content_en?: string | null
          meta_description_en?: string | null
          featured_image?: string | null
          primary_keyword?: string | null
          secondary_keywords?: string[] | null
          reading_time_minutes?: number
          word_count?: number | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_images: {
        Row: {
          id: string
          post_id: string
          image_url: string
          alt_text: string | null
          position: number
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          image_url: string
          alt_text?: string | null
          position: number
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          image_url?: string
          alt_text?: string | null
          position?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
