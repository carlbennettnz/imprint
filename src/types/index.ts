import { guard, object, array, number, boolean, string, oneOf, $DecoderType } from 'decoders'

const attempt = object({
  timestamp: string,
  correct: boolean,
  guess: string
})

const word = object({
  _id: string,
  pinyin: string,
  characters: string,
  en: array(string),
  status: oneOf(['LEARNED', 'NEEDS_REVIEW', 'UNLEARNED']),
  history: array(attempt)
})

const lesson = object({
  _id: string,
  course: string,
  number: number,
  title: string,
  items: array(string)
})

export type RawLesson = $DecoderType<typeof lesson>
export type RawWord = $DecoderType<typeof word>
export type Attempt = $DecoderType<typeof attempt>
export type QuizItem = RawWord & { history: Attempt[] }
export type Lesson = Omit<RawLesson, 'items'> & { items: QuizItem[] }

export const lessonsGuard = guard(array(lesson))
export const wordsGuard = guard(array(word))
export const attemptsGuard = guard(array(attempt))
