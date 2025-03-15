<template>
  <div class="suggestions-list">
    <h3>Sugestões de Melhorias</h3>
    <div class="suggestions-content">
      <div v-for="(suggestion, index) in parsedSuggestions" :key="index" class="suggestion-item">
        <div class="suggestion-header">
          <span class="suggestion-type">{{ suggestion.type }}</span>
        </div>
        <p class="suggestion-text">{{ suggestion.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuggestionsList',
  props: {
    suggestions: {
      type: String,
      required: true
    }
  },
  computed: {
    parsedSuggestions() {
      // Aqui você pode implementar a lógica para parser as sugestões
      // em um formato mais estruturado
      return this.suggestions.split('\n\n').map(suggestion => ({
        type: 'Sugestão',
        text: suggestion
      }))
    }
  }
}
</script>

<style scoped>
.suggestions-list {
  margin-top: 20px;
}

.suggestion-item {
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.suggestion-type {
  font-weight: bold;
  color: #2196F3;
}

.suggestion-text {
  margin-top: 8px;
  line-height: 1.5;
}
</style> 