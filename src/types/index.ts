import { guard, object, array, number, boolean, string, $DecoderType } from 'decoders'

const attempt = object({
  id: number,
  word: number,
  timestamp: string,
  correct: boolean,
  guess: string
})

const word = object({
  id: number,
  pinyin: string,
  characters: string,
  en: array(string)
})

const lesson = object({
  number: number,
  title: string,
  items: array(number)
})

export type RawLesson = $DecoderType<typeof lesson>
export type RawWord = $DecoderType<typeof word>
export type Attempt = $DecoderType<typeof attempt>
export type QuizItem = RawWord & { history: Attempt[] }
export type Lesson = Omit<RawLesson, 'items'> & { items: QuizItem[] }

export const lessonsGuard = guard(array(lesson))
export const wordsGuard = guard(array(word))
export const attemptsGuard = guard(array(attempt))
