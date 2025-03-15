<template>
  <div class="min-h-screen bg-gray-50">
    <Navigation />
    
    <!-- Header com gradiente -->
    <header v-if="showHeader" class="bg-gradient-to-r from-primary-600 to-primary-800 pb-32">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div class="text-center">
          <h1 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <slot name="header-title">{{ title }}</slot>
          </h1>
          <p class="mt-4 text-lg text-primary-100">
            <slot name="header-description">{{ description }}</slot>
          </p>
        </div>
      </div>
    </header>

    <!-- Conteúdo principal -->
    <main :class="[showHeader ? '-mt-32' : 'pt-16']">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <slot></slot>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="py-8 text-center text-sm text-gray-500">
          <p>&copy; {{ new Date().getFullYear() }} CurriculAI. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  showHeader: {
    type: Boolean,
    default: true
  }
})
</script> 