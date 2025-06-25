export async function getTasksFromNotion() {
  const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY
  const NOTION_TOKEN = import.meta.env.NOTION_TOKEN
  console.log(` getTasksFromNotion ~ import.meta.env:`, import.meta.env)
  const NOTION_DATABASE_ID = import.meta.env.NOTION_DATABASE_ID
  const res = await fetch(
    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({}),
    }
  )
  const data = await res.json()
  return data.results.map((page) => ({
    id: page.id,
    title: page.properties.Name?.title?.[0]?.plain_text || '',
    status: page.properties.Status?.select?.name || '',
    priority: page.properties.Priority?.select?.name || '',
  }))
}

export async function getPageBlocks(pageId: string) {
  const NOTION_TOKEN = import.meta.env.NOTION_TOKEN
  const res = await fetch(
    `https://api.notion.com/v1/blocks/${pageId}/children`,
    {
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
    }
  )
  const data = await res.json()
  return data.results
}
