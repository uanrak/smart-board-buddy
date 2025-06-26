/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotionDataResponse } from '@/interfaces/Notion'
import React, { useMemo } from 'react'
import { render } from 'react-dom'

interface AdvancedTodoProps {
  blocks: NotionDataResponse
}

const NotionRenderer = ({ blocks }: AdvancedTodoProps) => {
  const renderBlock = ({ key, value }: { key: string; value: any }) => {
    switch (value.type) {
      case 'title':
        return (
          <h2 key={key} className="text-xl font-bold">
            {value.title[0]?.plain_text || 'No Title'}
          </h2>
        )
      case 'rich_text':
        return (
          <p key={key} className="text-base">
            {value.rich_text[0]?.plain_text || 'No Content'}
          </p>
        )
      case 'number':
        return (
          <p key={key} className="text-base">
            {value.number || 'No Number'}
          </p>
        )
      case 'select':
        return (
          <p key={key} className="text-base">
            {value.select?.name || 'No Selection'}
          </p>
        )
      case 'formula': {
        const formulaNumber = (value.formula?.number || 0) * 100

        const pct = Math.max(0, Math.min(100, formulaNumber))
        return (
          <div className="flex align-center space-x-2" key={key}>
            <div
              style={{
                position: 'relative',
                width:50,
                height: '4px',
                background: '#2d2d2d',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: '#4ade80', // verde claro
                }}
              />
            </div>
            <p key={key} className="text-base">
              {`${formulaNumber.toFixed(1)}%`}
            </p>
          </div>
        )
      }
      case 'multi_select':
        return (
          <div key={key} className="flex space-x-2">
            {value.multi_select.map((item: any) => (
              <span
                key={item.id}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
              >
                {item.name}
              </span>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {Object.entries(blocks?.results[0].properties).reduce(
        (accum, [key, value]) => {
          return [...accum, renderBlock({ key, value })]
        },
        []
      )}
    </div>
  )
}

export default NotionRenderer
