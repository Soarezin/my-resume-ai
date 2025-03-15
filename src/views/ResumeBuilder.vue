<template>
  <BaseLayout
    title="Criar Currículo"
    description="Use nossa IA para criar um currículo profissional"
  >
    <div class="space-y-8">
      <!-- Formulário de Informações Pessoais -->
      <BaseCard>
        <template #header>
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Informações Pessoais
          </h3>
        </template>

        <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div>
            <label for="firstName" class="form-label">Nome</label>
            <input
              type="text"
              id="firstName"
              v-model="form.firstName"
              class="form-input"
              required
            />
          </div>

          <div>
            <label for="lastName" class="form-label">Sobrenome</label>
            <input
              type="text"
              id="lastName"
              v-model="form.lastName"
              class="form-input"
              required
            />
          </div>

          <div class="sm:col-span-2">
            <label for="email" class="form-label">Email Profissional</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="form-input"
              required
            />
          </div>

          <div class="sm:col-span-2">
            <label for="phone" class="form-label">Telefone</label>
            <input
              type="tel"
              id="phone"
              v-model="form.phone"
              class="form-input"
              required
            />
          </div>

          <div class="sm:col-span-2">
            <label for="location" class="form-label">Localização</label>
            <input
              type="text"
              id="location"
              v-model="form.location"
              class="form-input"
              placeholder="Cidade, Estado"
              required
            />
          </div>
        </div>
      </BaseCard>

      <!-- Experiência Profissional -->
      <BaseCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Experiência Profissional
            </h3>
            <BaseButton
              size="sm"
              variant="secondary"
              @click="addExperience"
            >
              Adicionar Experiência
            </BaseButton>
          </div>
        </template>

        <div class="space-y-6">
          <div
            v-for="(exp, index) in form.experiences"
            :key="index"
            class="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
          >
            <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div class="sm:col-span-2">
                <label :for="'company-' + index" class="form-label">Empresa</label>
                <input
                  type="text"
                  :id="'company-' + index"
                  v-model="exp.company"
                  class="form-input"
                />
              </div>

              <div class="sm:col-span-2">
                <label :for="'position-' + index" class="form-label">Cargo</label>
                <input
                  type="text"
                  :id="'position-' + index"
                  v-model="exp.position"
                  class="form-input"
                />
              </div>

              <div>
                <label :for="'startDate-' + index" class="form-label">Data Início</label>
                <input
                  type="date"
                  :id="'startDate-' + index"
                  v-model="exp.startDate"
                  class="form-input"
                />
              </div>

              <div>
                <label :for="'endDate-' + index" class="form-label">Data Fim</label>
                <input
                  type="date"
                  :id="'endDate-' + index"
                  v-model="exp.endDate"
                  class="form-input"
                />
              </div>

              <div class="sm:col-span-2">
                <label :for="'description-' + index" class="form-label">Descrição</label>
                <textarea
                  :id="'description-' + index"
                  v-model="exp.description"
                  rows="3"
                  class="form-input"
                ></textarea>
              </div>
            </div>

            <div class="mt-4 flex justify-end">
              <BaseButton
                size="sm"
                variant="danger"
                @click="removeExperience(index)"
              >
                Remover
              </BaseButton>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Botões de Ação -->
      <div class="flex justify-end space-x-4">
        <BaseButton
          variant="secondary"
          :disabled="loading"
          @click="previewResume"
        >
          Visualizar
        </BaseButton>
        <BaseButton
          variant="primary"
          :loading="loading"
          :disabled="!isFormValid"
          @click="generateResume"
        >
          Gerar Currículo com IA
        </BaseButton>
      </div>
    </div>

    <!-- Modal de Preview -->
    <TransitionRoot appear :show="showPreview" as="template">
      <Dialog as="div" @close="showPreview = false" class="relative z-50">
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <DialogPanel class="w-full max-w-4xl rounded-lg bg-white p-6">
              <DialogTitle class="text-lg font-medium leading-6 text-gray-900">
                Preview do Currículo
              </DialogTitle>
              
              <!-- Conteúdo do Preview -->
              <div class="mt-4">
                <!-- Adicione aqui o preview do currículo -->
              </div>

              <div class="mt-6 flex justify-end">
                <BaseButton
                  variant="secondary"
                  @click="showPreview = false"
                >
                  Fechar
                </BaseButton>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </BaseLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from '@headlessui/vue'
import BaseLayout from '@/components/BaseLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import { usePlanStore } from '@/stores/planStore'

const planStore = usePlanStore()
const loading = ref(false)
const showPreview = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  experiences: []
})

const isFormValid = computed(() => {
  return form.value.firstName &&
         form.value.lastName &&
         form.value.email &&
         form.value.phone &&
         form.value.location
})

function addExperience() {
  form.value.experiences.push({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  })
}

function removeExperience(index) {
  form.value.experiences.splice(index, 1)
}

async function generateResume() {
  if (!isFormValid.value) return

  loading.value = true
  try {
    // Implementar a geração do currículo com IA
    await planStore.incrementAnalysisCount()
  } catch (error) {
    console.error('Erro ao gerar currículo:', error)
  } finally {
    loading.value = false
  }
}

function previewResume() {
  showPreview.value = true
}
</script> 