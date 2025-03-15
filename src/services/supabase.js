import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key são obrigatórios')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Função auxiliar para tratar erros
export const handleError = (error) => {
  console.error('Erro Supabase:', error)
  return {
    error: {
      message: error.message || 'Ocorreu um erro inesperado'
    }
  }
} 