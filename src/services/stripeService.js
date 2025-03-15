import { supabase } from './supabase'

const createCheckoutSession = async (priceId) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      }),
    })

    if (!response.ok) {
      throw new Error('Erro ao criar sessão de checkout')
    }

    const { url } = await response.json()
    window.location.href = url
  } catch (error) {
    console.error('Erro no checkout:', error)
    throw error
  }
}

export const stripeService = {
  createCheckoutSession,

  async createPortalSession() {
    try {
      const { data, error } = await supabase.functions.invoke('create-portal-session')

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao criar sessão do portal:', error)
      throw error
    }
  }
} 