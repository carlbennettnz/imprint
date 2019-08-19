import { LESSONS, WORDS } from './fixtures'
import {
  Lesson,
  lessonsGuard,
  RawLesson,
  wordsGuard,
  RawWord,
  Attempt,
  attemptsGuard
} from '../types'

export const getLessons = (): Lesson[] => {
  const lessons = getRawLessons()
  const words = getRawWords()
  const attempts = getAttempts()

  return lessons.map(lesson => ({
    ...lesson,
    items: lesson.items.map(wordId => ({
      ...words.find(word => word.id === wordId)!,
      history: attempts.filter(attempt => attempt.word === wordId)
    }))
  }))
}

const getRawLessons = (): RawLesson[] => {
  try {
    return lessonsGuard(JSON.parse(localStorage.lessons))
  } catch (err) {
    localStorage.lessons = JSON.stringify(LESSONS)
    return LESSONS
  }
}

const getRawWords = (): RawWord[] => {
  try {
    return wordsGuard(JSON.parse(localStorage.words))
  } catch (err) {
    localStorage.words = JSON.stringify(WORDS)
    return WORDS
  }
}

const getAttempts = (): Attempt[] => {
  try {
    return attemptsGuard(JSON.parse(localStorage.attempts))
  } catch (err) {
    localStorage.attempts = JSON.stringify([])
    return []
  }
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

export const getDictionary = (): { [word: string]: any } => {
  try {
    return JSON.parse(localStorage.dictionary)
  } catch (err) {
    localStorage.dictionary = JSON.stringify([])
    return []
  }
}

export const upsertWord = (update: any): any => {
  const dict = getDictionary()
  const current = dict[update.characters] || {}

  dict[update.characters] = {
    ...current,
    ...update
  }

  saveDictionary(dict)

  return dict
}

export const addToHistory = (word: string, event: any): void => {
  const dict = getDictionary()
  const current = dict[word]

  if (!current) {
    throw new Error('Word not in dictionary')
  }

  dict[word] = {
    ...current,
    history: [...current.history, event]
  }

  saveDictionary(dict)
}

const saveDictionary = (dict: any): void => {
  localStorage.dictionary = JSON.stringify(dict)
}
