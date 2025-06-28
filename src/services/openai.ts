import type { ChatMessage } from '@/types'

export class OpenAIService {
  private apiKey: string
  private apiUrl: string

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || ''
    this.apiUrl =
      import.meta.env.VITE_OPENAI_API_URL ||
      'https://api.openai.com/v1/chat/completions'
  }

  async chat(messages: ChatMessage[]) {
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
