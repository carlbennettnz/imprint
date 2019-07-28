import React from 'react'
import { QuizItem } from '../types/QuizItem'

type LessonContentProps = {
  items: QuizItem[]
  isEditable: boolean
  updateItem: (item: QuizItem) => void
}

export const LessonContents = ({ items, isEditable, updateItem }: LessonContentProps) => {
  if (isEditable) {
    items = [
      ...items,
      {
        id: 0,
        pinyin: '',
        characters: '',
        en: []
      }
    ]
  }

  return (
    <div className="bg-white border rounded-lg mt-4">
      <table className="p-4 w-full">
        <tbody>
          {items.map((item: QuizItem, i: number) => {
            const update = (event: Event) => {
              const target = event.target as HTMLInputElement
              const key = target.name.match(/\]\.(.+)/)![1]
              let value: string | string[] = target.value
              if (key === 'en') value = value.split(', ')
              updateItem({ ...item, [key]: value })
            }

            return (
              <LessonItemRow
                // This is actually more stable than item.id due to new
                // items not being assigned ids until they're saved
                key={i}
                item={item}
                update={update}
                editable={isEditable}
                isLast={i < items.length - 1}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const LessonItemRow = ({ key, item, update, editable, isLast }: any) => {
  const cellStyles = 'py-1 text-grey-darkest'
  let inputStyles =
    'w-full border-2 border-transparent focus:border-blue-light outline-none p-2 rounded text-black'

  if (editable) {
    inputStyles += ' hover:border-grey-light'
  }

  return (
    <tr key={key} className={isLast ? 'border-b' : ''}>
      <td className={`${cellStyles} text-xl w-16 pl-1`}>
        <input
          name={`items[${item.id}].characters`}
          placeholder="字符"
          value={item.characters}
          disabled={!editable}
          className={inputStyles}
          onChange={update}
        />
      </td>

      <td className={`${cellStyles} text-grey-dark w-48`}>
        <input
          name={`items[${item.id}].pinyin`}
          placeholder="pinyin"
          value={item.pinyin}
          disabled={!editable}
          className={inputStyles}
          onChange={update}
        />
      </td>

      <td className={`${cellStyles} pr-1`}>
        <input
          name={`items[${item.id}].en`}
          placeholder="en"
          value={item.en.join(', ')}
          disabled={!editable}
          className={inputStyles}
          onChange={update}
        />
      </td>
    </tr>
  )
}
