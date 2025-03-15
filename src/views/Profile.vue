<template>
  <div class="profile">
    <header class="profile-header">
      <h1>Meu Perfil</h1>
      <button @click="authStore.logout" class="logout-button">
        Sair
      </button>
    </header>

    <div class="profile-content">
      <div class="profile-card">
        <h2>Informações da Conta</h2>
        <div class="info-group">
          <label>Email</label>
          <p>{{ authStore.user?.email }}</p>
        </div>

        <div class="info-group">
          <label>Plano Atual</label>
          <p>{{ userPlan }}</p>
        </div>

        <div class="info-group">
          <label>Análises Restantes</label>
          <p>{{ remainingAnalyses }} análises este mês</p>
        </div>

        <div class="actions">
          <button @click="handleUpgrade" class="upgrade-button" v-if="userPlan === 'Gratuito'">
            Fazer Upgrade para Premium
          </button>
          <button @click="showChangePassword = true" class="change-password-button">
            Alterar Senha
          </button>
        </div>
      </div>

      <!-- Modal de alteração de senha -->
      <div v-if="showChangePassword" class="modal-overlay">
        <div class="modal">
          <h3>Alterar Senha</h3>
          <form @submit.prevent="handlePasswordChange">
            <div class="form-group">
              <label for="currentPassword">Senha Atual</label>
              <input 
                type="password" 
                id="currentPassword"
                v-model="passwordForm.current"
                required
              >
            </div>

            <div class="form-group">
              <label for="newPassword">Nova Senha</label>
              <input 
                type="password" 
                id="newPassword"
                v-model="passwordForm.new"
                required
              >
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirmar Nova Senha</label>
              <input 
                type="password" 
                id="confirmPassword"
                v-model="passwordForm.confirm"
                required
              >
            </div>

            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <div class="modal-actions">
              <button type="button" @click="showChangePassword = false" class="cancel-button">
                Cancelar
              </button>
              <button type="submit" :disabled="loading" class="save-button">
                {{ loading ? 'Salvando...' : 'Salvar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const showChangePassword = ref(false)
const loading = ref(false)
const error = ref('')

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

// Simulando dados do plano do usuário
const userPlan = ref('Gratuito')
const remainingAnalyses = ref(3)

async function handlePasswordChange() {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    error.value = 'As senhas não coincidem'
    return
  }

  loading.value = true
  error.value = ''

  try {
    // Implementar a lógica de alteração de senha
    await authStore.updatePassword(passwordForm.value.current, passwordForm.value.new)
    showChangePassword.value = false
    // Mostrar mensagem de sucesso
  } catch (err) {
    error.value = 'Erro ao alterar senha. Verifique sua senha atual.'
  } finally {
    loading.value = false
  }
}

function handleUpgrade() {
  // Implementar redirecionamento para página de upgrade/pagamento
  router.push('/pricing')
}
</script>

<style scoped>
.profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.profile-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.info-group {
  margin-bottom: 1.5rem;
}

.info-group label {
  display: block;
  color: #666;
  margin-bottom: 0.5rem;
}

.info-group p {
  font-size: 1.1rem;
  color: #333;
}

.actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.upgrade-button {
  background: #2196F3;
  color: white;
}

.change-password-button {
  background: #e0e0e0;
  color: #333;
}

.logout-button {
  background: #f44336;
  color: white;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-button {
  background: #e0e0e0;
  color: #333;
}

.save-button {
  background: #4CAF50;
  color: white;
}

.error-message {
  color: #f44336;
  margin: 1rem 0;
}
</style> 