import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'
import { ref, computed } from 'vue'
import { usePlanStore } from './planStore'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)
  const session = ref(null)

  const isAuthenticated = computed(() => !!user.value)

  async function init() {
    loading.value = true
    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession()
      session.value = currentSession
      user.value = currentSession?.user ?? null

      if (user.value) {
        const planStore = usePlanStore()
        await planStore.fetchUserPlan()
      }

      supabase.auth.onAuthStateChange(async (_event, newSession) => {
        session.value = newSession
        user.value = newSession?.user ?? null
        
        if (user.value) {
          const planStore = usePlanStore()
          await planStore.fetchUserPlan()
        }
      })
    } catch (error) {
      console.error('Erro ao inicializar auth:', error)
    } finally {
      loading.value = false
    }
  }

  async function login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  async function loginWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  async function loginWithGithub() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  async function register(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      if (error) throw error

      // Criar plano gratuito para o novo usuário
      if (data.user) {
        const { error: planError } = await supabase
          .from('user_plans')
          .insert([
            {
              user_id: data.user.id,
              plan_type: 'free',
              analysis_count: 0
            }
          ])
        if (planError) throw planError
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  async function logout() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      user.value = null
      session.value = null
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  async function updatePassword(newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Erro ao atualizar senha:', error)
      return { error }
    }
  }

  return {
    user,
    loading,
    session,
    isAuthenticated,
    init,
    login,
    loginWithGoogle,
    loginWithGithub,
    register,
    logout,
    updatePassword
  }
}) 