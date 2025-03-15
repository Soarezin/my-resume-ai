<template>
  <div class="resume-builder">
    <div class="input-sections">
      <!-- Seção do currículo -->
      <div class="resume-section">
        <h2>Seu Currículo</h2>
        <textarea
          v-model="resumeContent"
          placeholder="Cole seu currículo aqui..."
          rows="10"
        ></textarea>
      </div>

      <!-- Seção da descrição da vaga -->
      <div class="job-section">
        <h2>Descrição da Vaga</h2>
        <textarea
          v-model="jobDescription"
          placeholder="Cole a descrição da vaga aqui..."
          rows="10"
        ></textarea>
      </div>
    </div>

    <div class="actions">
      <button 
        @click="analyzeResume" 
        :disabled="isAnalyzing || !canAnalyze"
        class="analyze-button"
      >
        <span v-if="isAnalyzing">
          <i class="fas fa-spinner fa-spin"></i> Analisando...
        </span>
        <span v-else>Analisar e Otimizar Currículo</span>
      </button>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="suggestions" class="results-section">
      <SuggestionsList :suggestions="suggestions" />
      <ResumePreview :content="optimizedResume" />
      
      <div class="action-buttons">
        <button 
          @click="applyChanges"
          class="apply-button"
        >
          Aplicar Alterações Sugeridas
        </button>
        <button 
          @click="downloadResume"
          class="download-button"
        >
          Baixar Currículo Otimizado
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import SuggestionsList from './SuggestionsList.vue'
import ResumePreview from './ResumePreview.vue'
import { analyzeResume } from '../services/deepseekService'

export default {
  name: 'ResumeBuilder',
  components: {
    SuggestionsList,
    ResumePreview
  },
  setup() {
    const resumeContent = ref('')
    const jobDescription = ref('')
    const suggestions = ref(null)
    const optimizedResume = ref('')
    const isAnalyzing = ref(false)
    const error = ref(null)

    const canAnalyze = computed(() => {
      return resumeContent.value.trim() && jobDescription.value.trim()
    })

    const handleAnalyzeResume = async () => {
      if (!canAnalyze.value) return

      isAnalyzing.value = true
      error.value = null

      try {
        const result = await analyzeResume(resumeContent.value, jobDescription.value)
        suggestions.value = result.suggestions
        optimizedResume.value = result.optimizedResume
      } catch (err) {
        error.value = 'Ocorreu um erro ao analisar o currículo. Por favor, tente novamente.'
        console.error(err)
      } finally {
        isAnalyzing.value = false
      }
    }

    const applyChanges = () => {
      if (optimizedResume.value) {
        resumeContent.value = optimizedResume.value
        suggestions.value = null
        optimizedResume.value = ''
      }
    }

    const downloadResume = () => {
      const element = document.createElement('a')
      const file = new Blob([optimizedResume.value], {type: 'text/plain'})
      element.href = URL.createObjectURL(file)
      element.download = 'curriculo-otimizado.txt'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }

    return {
      resumeContent,
      jobDescription,
      suggestions,
      optimizedResume,
      isAnalyzing,
      error,
      canAnalyze,
      analyzeResume: handleAnalyzeResume,
      applyChanges,
      downloadResume
    }
  }
}
</script>

<style scoped>
.resume-builder {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.input-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.resume-section,
.job-section {
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  font-family: 'Arial', sans-serif;
}

.actions {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.analyze-button,
.apply-button,
.download-button {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 0 10px;
  transition: all 0.3s ease;
}

.analyze-button {
  background-color: #2196F3;
  color: white;
}

.apply-button {
  background-color: #4CAF50;
  color: white;
}

.download-button {
  background-color: #607D8B;
  color: white;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #f44336;
  text-align: center;
  margin: 10px 0;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
}

.results-section {
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}
</style> 