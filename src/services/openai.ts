import type { ChatMessage } from '@/types'

export class OpenAIService {
  private apiKey: string
  private apiUrl: string
  private apiBaseUrl: string | null

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || ''
    this.apiUrl =
      import.meta.env.VITE_OPENAI_API_URL ||
      'https://api.openai.com/v1/chat/completions'
    this.apiBaseUrl = import.meta.env.VITE_API_BASE_URL || null
  }

  async chat(messages: ChatMessage[]) {
    if (this.apiBaseUrl) {
      const last = messages[messages.length - 1]
      const res = await fetch(`${this.apiBaseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: last.text }),
      })
      const data = await res.json()
      return data.answer
    }

    const formatted = messages.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text,
    }))

    const res = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: formatted,
      }),
    })

    const data = await res.json()
    return data?.choices?.[0]?.message?.content
  }
}

export const openAIService = new OpenAIService()
