import { NotionBlock } from '@/types'

interface NotionRendererProps {
  blocks: NotionBlock[]
}

function extractText(block: any): string {
  const rich = block?.rich_text || []
  return rich.map((t: any) => t.plain_text).join('')
}

export const NotionRenderer = ({ blocks }: NotionRendererProps) => {
  return (
    <div className="space-y-2">
      {blocks.map((block) => {
        const { id, type } = block
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
