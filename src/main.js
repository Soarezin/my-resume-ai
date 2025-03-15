import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'

// Cria a instância do app
const app = createApp(App)

// Cria e usa o Pinia
const pinia = createPinia()
app.use(pinia)

// Usa o router
app.use(router)

// Inicializa a autenticação antes de montar o app
const authStore = useAuthStore()

// Função de inicialização
const init = async () => {
  await authStore.init()
  app.mount('#app')
}

// Inicia o app
init()
