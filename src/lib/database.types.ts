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
      categories: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
        }
      }
      medications: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          category_id: string
          stock_quantity: number
          minimum_stock: number
          unit_price: number
          manufacturer: string
          expiry_date: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          category_id: string
          stock_quantity: number
          minimum_stock: number
          unit_price: number
          manufacturer: string
          expiry_date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          category_id?: string
          stock_quantity?: number
          minimum_stock?: number
          unit_price?: number
          manufacturer?: string
          expiry_date?: string | null
        }
      }
      inventory_transactions: {
        Row: {
          id: string
          created_at: string
          medication_id: string
          transaction_type: 'IN' | 'OUT'
          quantity: number
          notes: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          medication_id: string
          transaction_type: 'IN' | 'OUT'
          quantity: number
          notes?: string | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          medication_id?: string
          transaction_type?: 'IN' | 'OUT'
          quantity?: number
          notes?: string | null
          user_id?: string
        }
      }
    }
  }
}