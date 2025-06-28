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

  async getDatabases() {
    if (this.apiBaseUrl) {
      const res = await fetch(`${this.apiBaseUrl}/notion/`)
      const data = await res.json()
      return data.results
    }
    const res = await fetch('https://api.notion.com/v1/search', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ filter: { property: 'object', value: 'database' } }),
    })
    const data = await res.json()
    return data.results
  }

  async getDatabasePages(databaseId: string) {
    if (this.apiBaseUrl) {
      const res = await fetch(`${this.apiBaseUrl}/notion/databases/${databaseId}`)
      return res.json()
    }
    const res = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({}),
      }
    )
    return res.json()
  }

  async getPageBlocks(pageId: string) {
    if (this.apiBaseUrl) {
      const res = await fetch(`${this.apiBaseUrl}/notion/databases/${pageId}`)
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
