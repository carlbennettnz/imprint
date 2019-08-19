import { guard, object, array, number, string, $DecoderType } from 'decoders'

const quizItem = object({
  id: number,
  pinyin: string,
  characters: string,
  en: array(string)
})

const lesson = object({
  number: number,
  title: string,
  items: array(quizItem)
})

export type Lesson = $DecoderType<typeof lesson>
export type QuizItem = $DecoderType<typeof quizItem>
export const lessonsGuard = guard(array(lesson))
