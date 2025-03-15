import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase, handleError } from '../services/supabase'

export const usePlanStore = defineStore('plan', () => {
  const currentPlan = ref('free')
  const analysisCount = ref(0)
  const maxAnalyses = ref(3) // Limite para plano gratuito
  const loading = ref(false)

  const remainingAnalyses = computed(() => {
    if (currentPlan.value === 'premium') return '∞'
    return Math.max(0, maxAnalyses.value - analysisCount.value)
  })

  const isPremium = computed(() => currentPlan.value === 'premium')

  async function fetchUserPlan() {
    try {
      loading.value = true
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('Usuário não autenticado')

      const { data: userPlan, error } = await supabase
        .from('user_plans')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) throw error

      if (userPlan) {
        currentPlan.value = userPlan.plan_type
        analysisCount.value = userPlan.analysis_count
        maxAnalyses.value = userPlan.plan_type === 'premium' ? Infinity : 3
      }

      return { data: userPlan, error: null }
    } catch (error) {
      return handleError(error)
    } finally {
      loading.value = false
    }
  }

  async function incrementAnalysisCount() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('Usuário não autenticado')

      const { data, error } = await supabase
        .from('user_plans')
        .update({ 
          analysis_count: analysisCount.value + 1,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error

      analysisCount.value++
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  }

  async function upgradeToPremium(stripeCustomerId, stripeSubscriptionId) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('Usuário não autenticado')

      const { data, error } = await supabase
        .from('user_plans')
        .update({ 
          plan_type: 'premium',
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: stripeSubscriptionId,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error

      currentPlan.value = 'premium'
      maxAnalyses.value = Infinity

      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  }

  return {
    currentPlan,
    analysisCount,
    maxAnalyses,
    loading,
    remainingAnalyses,
    isPremium,
    fetchUserPlan,
    incrementAnalysisCount,
    upgradeToPremium
  }
}) 