import React, { useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

import { saveLesson, getLessons } from '../../data/db'
import { Lesson as LessonType, QuizItem } from '../../data/types'
import useTask from '../../shared/use-task.hook'

import { LessonControls } from './lesson-controls.component'
import { LessonContent } from './lesson-content.component'
import { Link } from 'react-router-dom'

interface LessonsProps extends RouteComponentProps {
  lesson: string
  edit: boolean
}

export const Lessons = withRouter<LessonsProps>(
  ({ lesson: lessonId, edit, history }: LessonsProps) => {
    const [lessons, setLessons] = useState<LessonType[] | null>(null)
    const [items, setItems] = useState<QuizItem[] | null>(null)
    const currentLesson = getCurrentLesson(lessons, lessonId)

    useTask(function*() {
      if (!lessonId) return
      const ls = yield getLessons()

      const current = getCurrentLesson(ls, lessonId)

      if (!current) return history.push('/add-words')

      setLessons(ls)
      setItems(current.items)
    }).onMount()

    const saveTask = useTask(function*(lesson, items) {
      yield saveLesson({ ...lesson, items })
      history.push(location.pathname.replace('/edit', ''))
    })

    if (!currentLesson || !items) return null

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

    return (
      <div className="max-w-lg w-full mx-auto mt-4 px-8">
        <header className="flex items-center h-8 mb-8">
          <Link to="/" className="font-sans text-xl my-0 text-blue no-underline font-bold">
            Imprint
          </Link>
          <span className="text-sm pt-1 text-grey px-4">▶</span>
          <h1 className="font-sans font-normal text-xl my-0 text-grey-darker">
            {currentLesson.course}
          </h1>
          <span className="text-sm pt-1 text-grey px-4">▶</span>
          <h1 className="font-sans font-normal text-xl my-0 text-grey-darker mr-auto">
            {currentLesson.title}
          </h1>

          <LessonControls
            lesson={currentLesson}
            edit={edit}
            save={() => saveTask.run(currentLesson, items)}
          />
        </header>

        <LessonContent items={items} isEditable={edit} updateItem={updateItem} />
      </div>
    )
  }
)

const getCurrentLesson = (lessons: LessonType[] | null, lessonId: string): LessonType | undefined =>
  (lessons || []).find(l => l._id == `lessons/${lessonId}`)
