import { LESSONS } from './lessons'
import { Lesson, lessonsGuard } from '../types/Lesson'

export const getLessons = (): Lesson[] => {
  try {
    const lessons = lessonsGuard(JSON.parse(localStorage.lessons))
    if (lessons.length > 0) return lessons
  } catch (err) {}
  localStorage.lessons = JSON.stringify(LESSONS)
  return LESSONS
}

export const getLesson = (num: number): Lesson | null => {
  return getLessons().find(lesson => lesson.number === num) || null
}

export const saveLesson = (lesson: Lesson) => {
  localStorage.lessons = JSON.stringify(
    getLessons().map(originalLesson =>
      originalLesson.number === lesson.number ? lesson : originalLesson
    )
  )
}
