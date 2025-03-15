<template>
  <nav class="bg-white shadow-md fixed w-full z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <router-link to="/" class="flex items-center">
            <span class="text-2xl font-bold text-primary-600">CurriculAI</span>
          </router-link>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden sm:flex sm:items-center sm:space-x-8">
          <template v-if="authStore.isAuthenticated">
            <router-link 
              to="/dashboard" 
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/profile" 
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md"
            >
              Perfil
            </router-link>
            <button 
              @click="authStore.logout" 
              class="btn-danger"
            >
              Sair
            </button>
          </template>
          <template v-else>
            <router-link 
              to="/login" 
              class="btn-primary"
            >
              Entrar
            </router-link>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <div class="sm:hidden flex items-center">
          <button 
            @click="isMenuOpen = !isMenuOpen"
            class="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg 
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                v-if="!isMenuOpen"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div 
      v-if="isMenuOpen" 
      class="sm:hidden bg-white border-t border-gray-200"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <template v-if="authStore.isAuthenticated">
          <router-link 
            to="/dashboard" 
            class="block px-3 py-2 rounded-md text-gray-700 hover:text-primary-600"
          >
            Dashboard
          </router-link>
          <router-link 
            to="/profile" 
            class="block px-3 py-2 rounded-md text-gray-700 hover:text-primary-600"
          >
            Perfil
          </router-link>
          <button 
            @click="authStore.logout" 
            class="w-full text-left px-3 py-2 text-red-600 hover:text-red-700"
          >
            Sair
          </button>
        </template>
        <template v-else>
          <router-link 
            to="/login" 
            class="block px-3 py-2 text-primary-600 hover:text-primary-700"
          >
            Entrar
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const isMenuOpen = ref(false)
</script> 