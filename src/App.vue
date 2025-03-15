<script setup>
import { provide } from 'vue'
import Navigation from './components/Navigation.vue'
import Notification from './components/Notification.vue'
import { useNotification } from './composables/useNotification'

const { notifications, show, remove: removeNotification } = useNotification()

// Fornece o sistema de notificações para todos os componentes
provide('notification', {
  show,
  remove: removeNotification
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navigation />
    <div class="pt-16">
      <router-view></router-view>
    </div>

    <!-- Notifications -->
    <div class="fixed bottom-0 right-0 p-6 z-50">
      <TransitionGroup
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <Notification
          v-for="notification in notifications"
          :key="notification.id"
          v-bind="notification"
          @close="removeNotification(notification.id)"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style>
/* Reset e estilos globais */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  color: #2196F3;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.login-button {
  background: #2196F3;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}

/* Hero Section */
.hero {
  padding: 8rem 2rem 4rem;
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  color: white;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.cta-button {
  background: white;
  color: #2196F3;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

/* Features Section */
.features {
  padding: 4rem 2rem;
  background: #f5f5f5;
}

.features h2 {
  text-align: center;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.feature-card i {
  font-size: 2rem;
  color: #2196F3;
  margin-bottom: 1rem;
}

/* Pricing Section */
.pricing {
  padding: 4rem 2rem;
}

.pricing h2 {
  text-align: center;
  margin-bottom: 3rem;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #ddd;
}

.pricing-card.featured {
  border: 2px solid #2196F3;
  transform: scale(1.05);
}

.price {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2196F3;
  margin: 1rem 0;
}

.price span {
  font-size: 1rem;
  color: #666;
}

.pricing-card ul {
  list-style: none;
  margin: 2rem 0;
}

.pricing-card li {
  margin: 0.5rem 0;
}

.pricing-button {
  background: #2196F3;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

/* Footer */
.footer {
  background: #333;
  color: white;
  padding: 4rem 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section h4 {
  margin-bottom: 1rem;
}

.footer-section a {
  color: white;
  text-decoration: none;
  display: block;
  margin: 0.5rem 0;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-links i {
  font-size: 1.5rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .pricing-card.featured {
    transform: none;
  }
}
</style>
