import React from 'react'
import { QuizItem } from '../../data/types'
import { LessonItemRow } from './lesson-item-row.component'

type LessonContentProps = {
  items: QuizItem[]
  isEditable: boolean
  updateItem: (item: QuizItem) => void
}

export const LessonContent = ({ items, isEditable, updateItem }: LessonContentProps) => {
  if (isEditable) {
    items = [
      ...items,
      {
        _id: '',
        _rev: undefined,
        pinyin: '',
        characters: '',
        en: [],
        status: 'UNLEARNED',
        history: []
      }
    ]
  }

  return (
    <div className="bg-white border rounded-lg mt-4">
      <table className="p-4 w-full">
        <tbody>
          {items.map((item: QuizItem, i: number) => (
            <LessonItemRow
              // This is actually more stable than item.id due to new
              // items not being assigned ids until they're saved
              key={i}
              item={item}
              update={delta => updateItem({ ...item, ...delta })}
              editable={isEditable}
              isLast={i < items.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
