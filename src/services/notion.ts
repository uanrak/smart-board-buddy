export async function getTasksFromNotion() {
  const res = await fetch('/api/tasks')
  const data = await res.json()
  return data.tasks
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
