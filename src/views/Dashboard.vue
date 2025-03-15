<template>
  <BaseLayout
    title="Dashboard"
    description="Gerencie seus currículos e análises"
  >
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <BaseCard>
        <template #header>
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Análises Restantes
          </h3>
        </template>
        
        <div class="text-center">
          <p class="text-5xl font-bold text-primary-600">
            {{ planStore.remainingAnalyses }}
          </p>
          <p class="mt-2 text-sm text-gray-500">
            análises disponíveis este mês
          </p>
        </div>

        <template #footer>
          <div class="text-center">
            <BaseButton
              v-if="planStore.currentPlan === 'free'"
              variant="primary"
              @click="router.push('/pricing')"
            >
              Fazer Upgrade
            </BaseButton>
          </div>
        </template>
      </BaseCard>

      <!-- Adicione mais cards aqui -->
    </div>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '../components/BaseLayout.vue'
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'
import { usePlanStore } from '../stores/planStore'
import { useRouter } from 'vue-router'

const planStore = usePlanStore()
const router = useRouter()
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.user-actions {
  display: flex;
  gap: 1rem;
}

.resume-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.resume-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.resume-preview {
  margin: 1rem 0;
  color: #666;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.primary-button {
  background: #2196F3;
  color: white;
}

.secondary-button {
  background: #e0e0e0;
  color: #333;
}

.logout-button {
  background: #f44336;
  color: white;
}

.view-button {
  background: #2196F3;
  color: white;
}

.no-resumes {
  text-align: center;
  padding: 3rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style> 