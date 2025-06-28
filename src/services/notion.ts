export class NotionService {
  private token: string
  private version = '2022-06-28'
  private apiBaseUrl: string | null

  constructor() {
    this.token = import.meta.env.NOTION_TOKEN || ''
    this.apiBaseUrl = import.meta.env.VITE_API_BASE_URL || null
  }

  private get headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      'Notion-Version': this.version,
    }
  }

  async getPages() {
    if (this.apiBaseUrl) {
      const res = await fetch(`${this.apiBaseUrl}/notion/`)
      const data = await res.json()
      return data.results
    }
    const res = await fetch('https://api.notion.com/v1/search', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ filter: { property: 'object', value: 'page' } }),
    })
    const data = await res.json()
    return data.results
  }

  async getPage(pageId: string) {
    if (this.apiBaseUrl) {
      const res = await fetch(`${this.apiBaseUrl}/notion/${pageId}`)
      return res.json()
    }
    const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
      headers: this.headers,
    })
    return res.json()
  }

  async getPageBlocks(pageId: string) {
    if (this.apiBaseUrl) {
      const res = await fetch(`${this.apiBaseUrl}/notion/${pageId}/blocks`)
      return res.json()
    }
    const res = await fetch(
      `https://api.notion.com/v1/blocks/${pageId}/children`,
      { headers: this.headers }
    )
    const data = await res.json()
    return data.results
  }
}

export const notionService = new NotionService()
