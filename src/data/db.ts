import { guard, object, array, number, string, $DecoderType } from 'decoders'
import { LESSONS } from './lessons'

const lessonItem = object({
  id: number,
  pinyin: string,
  characters: string,
  en: array(string)
})

const lesson = object({
  number: number,
  title: string,
  items: array(lessonItem)
})

type Lesson = $DecoderType<typeof lesson>

const lessonsGuard = guard(array(lesson))

export const getLessons = (): Lesson[] => {
  try {
    const lessons = lessonsGuard(JSON.parse(localStorage.lessons))
    if (lessons.length > 0) return lessons
  } catch (err) {}
  localStorage.lessons = JSON.stringify(LESSONS)
  return LESSONS
}

export const getLesson = (num: number): Lesson | undefined => {
  return getLessons().find(lesson => lesson.number === num)
}

export const saveLesson = (lesson: Lesson) => {
  localStorage.lessons = JSON.stringify(
    getLessons().map(originalLesson =>
      originalLesson.number === lesson.number ? lesson : originalLesson
    )
  )
}
