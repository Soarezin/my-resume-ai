const DEEPSEEK_API_URL = import.meta.env.VITE_DEEPSEEK_API_URL
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY

export const analyzeResume = async (resume, jobDescription) => {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "Você é um especialista em análise e otimização de currículos. Sua tarefa é analisar o currículo fornecido e sugerir melhorias específicas baseadas na descrição da vaga."
          },
          {
            role: "user",
            content: `Por favor, analise este currículo:\n\n${resume}\n\nPara esta vaga:\n\n${jobDescription}\n\nSugira melhorias específicas e forneça uma versão otimizada do currículo.`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      throw new Error('Falha na comunicação com a API')
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error('Erro na API Deepseek:', error)
    throw error
  }
} 