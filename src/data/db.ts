import PouchDB from 'pouchdb'
import debug from 'pouchdb-debug'

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

const db = new PouchDB('imprint')

PouchDB.plugin(debug)
PouchDB.debug.enable('*')

export const getLessons = async (): Promise<Lesson[]> => {
  let lessons: RawLesson[]
  let words: RawWord[]

  try {
    ;[lessons, words] = await Promise.all([getRawLessons(), getRawWords()])
  } catch (err) {
    console.error(err)
    lessons = LESSONS
    words = WORDS
    await db.bulkDocs([...LESSONS, ...WORDS])
  }

  return lessons.map(lesson => {
    const items = lesson.items.map(wordId => words.find(word => word._id === wordId)!)
    return { ...lesson, items }
  })
}

const getRawLessons = async (): Promise<RawLesson[]> => {
  try {
    const { rows } = await db.allDocs({
      startkey: 'lessons/',
      endkey: 'lessons/\ufff0',
      include_docs: true
    })

    return lessonsGuard(rows.map(row => row.doc))
  } catch (err) {
    console.error(err)
    db.bulkDocs(LESSONS)
    return LESSONS
  }
}

const getRawWords = async (): Promise<RawWord[]> => {
  try {
    const { rows } = await db.allDocs({
      startkey: 'words/',
      endkey: 'words/\ufff0',
      include_docs: true
    })

    return wordsGuard(rows.map(row => row.doc))
  } catch (err) {
    console.error(err)
    db.bulkDocs(WORDS)
    return WORDS
  }
}

export interface WordsSummary {
  learned: number
  needsReview: number
  unlearned: number
}

export const getWordsSummary = async (): Promise<WordsSummary> => {
  const words = await getRawWords()

  return {
    learned: words.filter(word => word.status === 'LEARNED').length,
    needsReview: words.filter(word => word.status === 'NEEDS_REVIEW').length,
    unlearned: words.filter(word => word.status === 'UNLEARNED').length
  }
}

export const addWords = async (words: RawWord[]) => {
  return await db.bulkDocs(words)
}

export const getLesson = async (num: number): Promise<Lesson | null> => {
  return (await getLessons()).find(lesson => lesson.number === num) || null
}

export const saveLesson = async (lesson: Lesson) => {
  db.put(lesson)
}

export const getDictionary = (): { [word: string]: any } => {
  try {
    return JSON.parse(localStorage.dictionary)
  } catch (err) {
    localStorage.dictionary = JSON.stringify([])
    return []
  }
}

export const upsertWord = (update: Partial<QuizItem>): any => {
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
