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
