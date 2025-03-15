<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <div class="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
      </div>

      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Pagamento Confirmado!
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Obrigado por assinar o CurriculAI Premium
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="space-y-6">
          <p class="text-center text-gray-700">
            Seu plano premium já está ativo. Aproveite todos os recursos disponíveis!
          </p>
          
          <div class="flex flex-col space-y-4">
            <router-link 
              to="/dashboard" 
              class="btn-primary text-center"
            >
              Ir para o Dashboard
            </router-link>
            
            <router-link 
              to="/profile" 
              class="btn-secondary text-center"
            >
              Ver Detalhes da Assinatura
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePlanStore } from '../stores/planStore'

const router = useRouter()
const planStore = usePlanStore()

onMounted(async () => {
  await planStore.fetchUserPlan()
})
</script> 