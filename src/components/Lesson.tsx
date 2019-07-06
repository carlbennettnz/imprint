import React, { useState } from 'react'

import { saveLesson } from '../data/db'
import { LessonControls } from './LessonControls'
import { LessonContents } from './LessonContents'
import { withRouter, RouterProps } from 'react-router'

type LessonProps = {
  lesson: any
  edit: boolean
  history: RouterProps['history']
}

export function Lesson({ lesson, edit, history }: LessonProps) {
  const [items, setItems] = useState(lesson.items)

  const updateItem = (item: any) => {
    const newItems = items.slice()
    console.log('original newItems', newItems.map((ni: any) => ni))
    const index = newItems.findIndex((i: any) => i.id === item.id)
    newItems[index] = item
    console.log('updateItem newItems', index, newItems)
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
