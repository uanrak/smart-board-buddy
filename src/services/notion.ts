export class NotionService {
  private token: string
  private version = '2022-06-28'

  constructor() {
    this.token = import.meta.env.NOTION_TOKEN || ''
  }

  private get headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      'Notion-Version': this.version,
    }
  }

  async getDatabases() {
    const res = await fetch('https://api.notion.com/v1/search', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ filter: { property: 'object', value: 'database' } }),
    })
    const data = await res.json()
    return data.results
  }

  async getDatabasePages(databaseId: string) {
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
    const res = await fetch(
      `https://api.notion.com/v1/blocks/${pageId}/children`,
      { headers: this.headers }
    )
    const data = await res.json()
    return data.results
  }
}

export const notionService = new NotionService()
