<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Planos e Preços
        </h2>
        <p class="mt-4 text-xl text-gray-600">
          Escolha o plano ideal para suas necessidades
        </p>
      </div>

      <div class="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto">
        <!-- Plano Gratuito -->
        <div class="card border-2 border-gray-200">
          <div class="p-6">
            <h3 class="text-2xl font-semibold text-gray-900">Gratuito</h3>
            <p class="mt-4 text-gray-500">Perfeito para começar</p>
            <p class="mt-8">
              <span class="text-4xl font-extrabold text-gray-900">R$ 0</span>
              <span class="text-base font-medium text-gray-500">/mês</span>
            </p>
            <ul class="mt-6 space-y-4">
              <li class="flex items-start">
                <span class="text-green-500 flex-shrink-0">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                <span class="ml-3 text-gray-500">3 análises por mês</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 flex-shrink-0">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                <span class="ml-3 text-gray-500">Sugestões básicas</span>
              </li>
            </ul>
            <button 
              @click="handleSelectPlan('free')"
              class="mt-8 w-full btn-secondary"
            >
              Começar Grátis
            </button>
          </div>
        </div>

        <!-- Plano Premium -->
        <div class="card border-2 border-primary-500">
          <div class="p-6">
            <h3 class="text-2xl font-semibold text-gray-900">Premium</h3>
            <p class="mt-4 text-gray-500">Para profissionais</p>
            <p class="mt-8">
              <span class="text-4xl font-extrabold text-gray-900">R$ 29,90</span>
              <span class="text-base font-medium text-gray-500">/mês</span>
            </p>
            <ul class="mt-6 space-y-4">
              <li class="flex items-start">
                <span class="text-green-500 flex-shrink-0">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                <span class="ml-3 text-gray-500">Análises ilimitadas</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 flex-shrink-0">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                <span class="ml-3 text-gray-500">Sugestões avançadas</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 flex-shrink-0">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                <span class="ml-3 text-gray-500">Histórico ilimitado</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 flex-shrink-0">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                <span class="ml-3 text-gray-500">Suporte prioritário</span>
              </li>
            </ul>
            <button 
              @click="handleSelectPlan('premium')"
              class="mt-8 w-full btn-primary"
              :disabled="loading"
            >
              {{ loading ? 'Processando...' : 'Assinar Agora' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { stripeService } from '../services/stripeService'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

async function handleSelectPlan(plan) {
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }

  if (plan === 'free') {
    router.push('/dashboard')
    return
  }

  loading.value = true
  try {
    const { url } = await stripeService.createCheckoutSession('price_premium')
    window.location.href = url
  } catch (error) {
    console.error('Erro ao processar assinatura:', error)
    // Implementar notificação de erro
  } finally {
    loading.value = false
  }
}
</script> 