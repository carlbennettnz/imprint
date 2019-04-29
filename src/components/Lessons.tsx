import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import { LessonsList } from './LessonList'
import { Lesson } from './Lesson'
import db from '../data/db'

type LessonsProps = { lesson?: string }

export const Lessons = ({ lesson }: LessonsProps) => {
  const [lessons, setLessons] = useState<any>(null)
  const [items, setItems] = useState<any>(null)

  useEffect(() => {
    if (!lesson) return

    setItems(null)

    db.getLessons().then(ls => {
      setLessons(ls)
      db.getLessonContent(getCurrentLesson(ls, lesson)).then(setItems)
    })
  }, [lesson])

  if (!lesson || !lessons || !items) return null

  const currentLesson = { ...getCurrentLesson(lessons, lesson), items }

  return (
    <div className="flex max-w-lg mx-auto mt-4">
      <LessonsList lessons={lessons} />
      <Lesson lesson={currentLesson} />
    </div>
  )
}

const getCurrentLesson = (lessons: any, lessonNum: string) =>
  lessons.find((l: any) => l.number == lessonNum)!
