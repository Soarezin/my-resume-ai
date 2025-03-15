<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative isolate overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800">
      <div class="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div class="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div class="mt-24 sm:mt-32 lg:mt-16">
            <a href="#pricing" class="inline-flex space-x-6">
              <span class="rounded-full bg-primary-500/10 px-3 py-1 text-sm font-semibold leading-6 text-white ring-1 ring-inset ring-primary-500/20">
                Novidade
              </span>
              <span class="inline-flex items-center space-x-2 text-sm font-medium text-white">
                <span>Lançamento v1.0</span>
                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
              </span>
            </a>
          </div>
          <h1 class="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Crie currículos profissionais com IA
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-300">
            Otimize seu currículo automaticamente com nossa tecnologia de IA avançada. 
            Aumente suas chances de conseguir a vaga dos seus sonhos.
          </p>
          <div class="mt-10 flex items-center gap-x-6">
            <router-link
              to="/register"
              class="rounded-md bg-primary-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
            >
              Começar Gratuitamente
            </router-link>
            <a href="#como-funciona" class="text-sm font-semibold leading-6 text-white">
              Saiba mais <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <ResumePreview class="w-[76rem]" />
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div id="como-funciona" class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-primary-600">Mais eficiência</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tudo que você precisa para criar um currículo perfeito
          </p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Nossa plataforma utiliza IA avançada para analisar e otimizar seu currículo, 
            garantindo que você se destaque no processo seletivo.
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <svg class="h-5 w-5 flex-none text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z" clip-rule="evenodd" />
                </svg>
                Análise Inteligente
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p class="flex-auto">
                  Nossa IA analisa seu currículo e fornece sugestões personalizadas 
                  para melhorar o conteúdo e a formatação.
                </p>
              </dd>
            </div>
            <!-- Adicione mais features aqui -->
          </dl>
        </div>
      </div>
    </div>

    <!-- Pricing Section -->
    <div id="pricing" class="bg-gray-900 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Planos para todos os objetivos
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-300">
            Escolha o plano que melhor se adapta às suas necessidades
          </p>
        </div>
        <!-- Adicione os cards de preço aqui -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import ResumeBuilder from '../components/ResumeBuilder.vue'
import ResumePreview from '@/components/ResumePreview.vue'

const router = useRouter()
const authStore = useAuthStore()
const showBuilder = ref(false)

const handleCTAClick = () => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
  } else {
    showBuilder.value = true
    // Scroll para a seção do builder
    setTimeout(() => {
      document.querySelector('.resume-builder-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
}
</script>

<style scoped>
/* Os estilos permanecem os mesmos do App.vue original */
</style> 