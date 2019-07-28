import React, { useState } from 'react'

import { saveLesson } from '../data/db'
import { LessonControls } from './LessonControls'
import { LessonContents } from './LessonContents'
import { withRouter, RouterProps } from 'react-router'
import { QuizItem } from '../types/QuizItem'

type LessonProps = {
  lesson: any
  edit: boolean
  history: RouterProps['history']
}

export function Lesson({ lesson, edit, history }: LessonProps) {
  const [items, setItems] = useState(lesson.items) as [QuizItem[], (items: QuizItem[]) => void]

  const updateItem = (item: QuizItem) => {
    const newItems = items.slice()
    const index =
      item.id !== 0 ? newItems.findIndex((i: QuizItem) => i.id === item.id) : newItems.length

    newItems[index] = {
      ...item,
      id: item.id || Math.floor(Math.random() * 10e12)
    }

    setItems(newItems)
  }

  const save = () => {
    saveLesson({ ...lesson, items })
    history.push(location.pathname.replace('/edit', ''))
  }

  return (
    <div className="w-full">
      <header className="flex items-center">
        <h2 className="text-base text-grey-darker px-4">
          Lesson {lesson.number}: {lesson.title}
        </h2>

        <LessonControls lesson={lesson} edit={edit} save={save} />
      </header>

      <LessonContents items={items} isEditable={edit} updateItem={updateItem} />
    </div>
  )
}
