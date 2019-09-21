import React, { useState, useEffect } from 'react'

import { LessonsList } from './LessonList'
import { Lesson } from './Lesson'
import { getLessons } from '../../data/db'
import { withRouter, RouteComponentProps } from 'react-router'

interface LessonsProps extends RouteComponentProps {
  lesson: string
  edit: boolean
}

export const Lessons = withRouter<LessonsProps>(({ lesson, edit, history }: LessonsProps) => {
  const [lessons, setLessons] = useState<any>(null)
  const [items, setItems] = useState<any>(null)

  useEffect(() => {
    if (!lesson) return
    getLessons().then(ls => {
      setLessons(ls)
      setItems(getCurrentLesson(ls, lesson).items)
    })
  }, [lesson])

  if (!lesson || !lessons || !items) return null

  const currentLesson = { ...getCurrentLesson(lessons, lesson), items }

  return (
    <div className="flex max-w-lg mx-auto mt-4">
      <LessonsList lessons={lessons} />
      <Lesson lesson={currentLesson} edit={edit} history={history} />
    </div>
  )
})

const getCurrentLesson = (lessons: any, lessonNum: string) =>
  lessons.find((l: any) => l.number == lessonNum)!
