import { NotionBlock } from '@/types'

interface NotionRendererProps {
  // Can be an array of blocks or a Notion list response
  blocks: NotionBlock[] | { object: 'list'; results: NotionBlock[] }
}

function extractText(block: any): string {
  const rich = block?.rich_text || []
  return rich.map((t: any) => t.plain_text).join('')
}

export const NotionRenderer = ({ blocks }: NotionRendererProps) => {
  const normalizedBlocks = Array.isArray(blocks)
    ? blocks
    : blocks?.object === 'list'
      ? (blocks as any).results
      : []

  return (
    <div className="space-y-2">
      {normalizedBlocks.map((block) => {
        const { id, type, object, properties } = block

        if (object === 'page') {
          const titleParts = properties?.Name?.title || []
          const title = titleParts.map((t: any) => t.plain_text).join('')
          return (
            <div key={id} className="p-4 border rounded space-y-1">
              <h2 className="text-lg font-bold">{title}</h2>
              <ul className="text-sm space-y-0.5">
                {Object.entries(properties || {}).map(([key, prop]) => {
                  if (key === 'Name') return null
                  if (prop.type === 'multi_select') {
                    const values = prop.multi_select
                      .map((v: any) => v.name)
                      .join(', ')
                    return (
                      <li key={key}>
                        <strong>{key}:</strong> {values}
                      </li>
                    )
                  }
                  if (prop.type === 'relation') {
                    return (
                      <li key={key}>
                        <strong>{key}:</strong> {prop.relation.length} relation{prop.relation.length === 1 ? '' : 's'}
                      </li>
                    )
                  }
                  if (prop.type === 'formula') {
                    const value = prop.formula[prop.formula.type]
                    if (value === null || value === undefined) return null
                    return (
                      <li key={key}>
                        <strong>{key}:</strong> {String(value)}
                      </li>
                    )
                  }
                  return null
                })}
              </ul>
            </div>
          )
        }

        switch (type) {
          case 'heading_1':
            return (
              <h1 key={id} className="text-2xl font-bold">
                {extractText(block.heading_1)}
              </h1>
            )
          case 'heading_2':
            return (
              <h2 key={id} className="text-xl font-semibold">
                {extractText(block.heading_2)}
              </h2>
            )
          case 'heading_3':
            return (
              <h3 key={id} className="text-lg font-semibold">
                {extractText(block.heading_3)}
              </h3>
            )
          case 'paragraph':
            return (
              <p key={id} className="text-base">
                {extractText(block.paragraph)}
              </p>
            )
          case 'to_do':
            return (
              <label key={id} className="flex items-center gap-2">
                <input type="checkbox" disabled checked={block.to_do?.checked} />
                <span>{extractText(block.to_do)}</span>
              </label>
            )
          case 'bulleted_list_item':
            return (
              <ul key={id} className="list-disc ml-6">
                <li>{extractText(block.bulleted_list_item)}</li>
              </ul>
            )
          case 'numbered_list_item':
            return (
              <ol key={id} className="list-decimal ml-6">
                <li>{extractText(block.numbered_list_item)}</li>
              </ol>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
