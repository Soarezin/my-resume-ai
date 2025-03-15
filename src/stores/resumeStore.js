import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../services/supabase'
import { useAuthStore } from './authStore'

export const useResumeStore = defineStore('resume', () => {
  const resumes = ref([])
  const loading = ref(false)

  async function fetchUserResumes() {
    const authStore = useAuthStore()
    if (!authStore.user) return

    loading.value = true
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', authStore.user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      resumes.value = data
    } catch (error) {
      console.error('Erro ao buscar currículos:', error)
    } finally {
      loading.value = false
    }
  }

  async function saveResume(resumeData) {
    const authStore = useAuthStore()
    if (!authStore.user) return

    try {
      const { data, error } = await supabase
        .from('resumes')
        .insert([
          {
            user_id: authStore.user.id,
            content: resumeData.content,
            job_description: resumeData.jobDescription,
            optimized_content: resumeData.optimizedContent,
            suggestions: resumeData.suggestions
          }
        ])
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Erro ao salvar currículo:', error)
      throw error
    }
  }

  return {
    resumes,
    loading,
    fetchUserResumes,
    saveResume
  }
}) 