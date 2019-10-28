import React, { useState } from 'react'

import { saveLesson } from '../../data/db'
import { LessonControls } from './lesson-controls.component'
import { LessonContent } from './lesson-content.component'
import { RouterProps } from 'react-router'
import { QuizItem } from '../../data/types'
import useTask from '../../shared/use-task.hook'

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
      item._id !== '' ? newItems.findIndex((i: QuizItem) => i._id === item._id) : newItems.length

    newItems[index] = {
      ...item,
      _id: item._id || `words/${Math.floor(Math.random() * 10e12)}`
    }

    setItems(newItems)
  }

  const saveTask = useTask(function*(lesson, items) {
    yield saveLesson({ ...lesson, items })
    history.push(location.pathname.replace('/edit', ''))
  })

  return (
    <div className="w-full">
      <header className="flex items-center">
        <h2 className="text-base text-grey-darker px-4">
          Lesson {lesson.number}: {lesson.title}
        </h2>

        <LessonControls lesson={lesson} edit={edit} save={() => saveTask.run(lesson, items)} />
      </header>

      <LessonContent items={items} isEditable={edit} updateItem={updateItem} />
    </div>
  )
}
