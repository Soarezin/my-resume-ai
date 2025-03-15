import { ref } from 'vue'

const notifications = ref([])

export function useNotification() {
  function show({ type = 'success', title, message, duration = 3000 }) {
    const id = Date.now()
    notifications.value.push({ id, type, title, message, duration })

    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }
  }

  function remove(id) {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  return {
    notifications,
    show,
    remove
  }
} 