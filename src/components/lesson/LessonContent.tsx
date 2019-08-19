import React, { ChangeEvent } from 'react'
import { QuizItem } from '../../types/Lesson'
import { LessonItemRow } from './LessonItemRow'

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
            const update = (event: ChangeEvent<HTMLInputElement>) => {
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
                index={i}
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
