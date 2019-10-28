import {
  guard,
  object,
  array,
  number,
  boolean,
  string,
  oneOf,
  $DecoderType,
  optional
} from 'decoders'

const attempt = object({
  _id: string,
  _rev: optional(string),
  timestamp: string,
  correct: boolean,
  guess: string
})

const word = object({
  _id: string,
  _rev: optional(string),
  pinyin: string,
  characters: string,
  en: array(string),
  status: oneOf(['LEARNED', 'NEEDS_REVIEW', 'UNLEARNED']),
  history: array(string)
})

const lesson = object({
  _id: string,
  _rev: optional(string),
  course: string,
  number: number,
  title: string,
  items: array(string)
})

export type RawLesson = $DecoderType<typeof lesson>
export type RawWord = $DecoderType<typeof word>
export type Attempt = $DecoderType<typeof attempt>
export type QuizItem = Omit<RawWord, 'history'> & { history: Attempt[] }
export type Lesson = Omit<RawLesson, 'items'> & { items: QuizItem[] }

export const lessonsGuard = guard(array(lesson))
export const wordsGuard = guard(array(word))
export const attemptsGuard = guard(array(attempt))
