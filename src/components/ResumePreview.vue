<template>
  <div class="w-full aspect-[4/3] bg-white rounded-lg shadow-xl overflow-hidden">
    <div class="h-full flex">
      <!-- Sidebar -->
      <div class="w-1/3 bg-primary-600 p-6 text-white">
        <div class="space-y-6">
          <!-- Foto -->
          <div class="w-32 h-32 mx-auto bg-white/20 rounded-full"></div>
          
          <!-- Contato -->
          <div class="space-y-2">
            <div class="h-4 bg-white/20 rounded w-2/3"></div>
            <div class="h-4 bg-white/20 rounded w-3/4"></div>
            <div class="h-4 bg-white/20 rounded w-1/2"></div>
          </div>
          
          <!-- Habilidades -->
          <div class="space-y-2">
            <div class="h-4 bg-white/20 rounded w-full"></div>
            <div class="h-4 bg-white/20 rounded w-4/5"></div>
            <div class="h-4 bg-white/20 rounded w-3/4"></div>
          </div>
        </div>
      </div>
      
      <!-- Conteúdo Principal -->
      <div class="flex-1 p-6">
        <div class="space-y-8">
          <!-- Cabeçalho -->
          <div class="space-y-2">
            <div class="h-8 bg-gray-200 rounded w-2/3"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          <!-- Experiência -->
          <div class="space-y-4">
            <div class="h-6 bg-gray-200 rounded w-1/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
          
          <!-- Educação -->
          <div class="space-y-4">
            <div class="h-6 bg-gray-200 rounded w-1/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResumePreview',
  props: {
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedContent() {
      return this.content.replace(/\n/g, '<br>')
    }
  }
}
</script>

<style scoped>
.resume-preview {
  padding: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.preview-content {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
}
</style> 