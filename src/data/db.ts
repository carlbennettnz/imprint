import PouchDB from 'pouchdb'
import debug from 'pouchdb-debug'

import { Lesson, lessonsGuard, RawLesson, wordsGuard, RawWord, QuizItem, Attempt } from './types'
import { LESSONS, WORDS } from './fixtures'

const open = () => new PouchDB('imprint')

let db = open()

const ready = new Promise<void>(r => {
  if ('initForTest' in window) {
    // @ts-ignore
    return window.initForTest(db, open, [...WORDS, ...LESSONS]).then(newDb => {
      db = newDb
      r()
    })
  } else {
    r()
  }
})

// PouchDB.plugin(debug)
// PouchDB.debug.enable('*')

export const getLessons = async (): Promise<Lesson[]> => {
  let lessons: RawLesson[]
  let words: RawWord[]

  await ready

  try {
    ;[lessons, words] = await Promise.all([getRawLessons(), getRawWords()])
  } catch (err) {
    console.error(err)
    lessons = []
  }

  return lessons.map(lesson => {
    const items = lesson.items.map(wordId => {
      const word = words.find(word => word._id === wordId)!
      return { ...word, history: [] }
    })

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
    return []
  }
}

export const getRawWords = async (): Promise<RawWord[]> => {
  try {
    const { rows } = await db.allDocs({
      startkey: 'words/',
      endkey: 'words/\ufff0',
      include_docs: true
    })

    return wordsGuard(rows.map(row => row.doc))
  } catch (err) {
    console.error(err)
    return []
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

export const addLesson = async (lesson: Lesson) => {
  await addWords(lesson.items)

  const rawLesson: RawLesson = {
    ...lesson,
    items: lesson.items.map(item => item._id)
  }

  if (rawLesson.number < 1) {
    const existing = await getRawLessons()
    const highestNum = existing
      .filter(l => l.course === rawLesson.course)
      .reduce((highest, l) => Math.max(highest, l.number), 0)

    rawLesson.number = highestNum + 1
  }

  console.log(rawLesson)

  await db.put(rawLesson)
}

export const addWords = async (words: QuizItem[]) => {
  for (const word of words) {
    delete word._rev
    word.history = []
  }
  return await db.bulkDocs(words)
}

export const getLesson = async (num: number): Promise<Lesson | null> => {
  return (await getLessons()).find(lesson => lesson.number === num) || null
}

export const saveLesson = async (lesson: Lesson) => {
  const rawLesson: RawLesson = { ...lesson, items: lesson.items.map(i => i._id) }
  const rawWords: RawWord[] = lesson.items.map(word => ({
    ...word,
    history: word.history.map(attempt => attempt._id)
  }))
  const history: Attempt[] = lesson.items.reduce(
    (attempts, word) => [...attempts, ...word.history],
    [] as Attempt[]
  )

  await ready
  await db.bulkDocs([rawLesson, ...rawWords, ...history])
}

// OLD LOCALSTORAGE STUFF

export const getDictionary = (): { [word: string]: any } => {
  try {
    return JSON.parse(localStorage.dictionary)
  } catch (err) {
    localStorage.dictionary = JSON.stringify([])
    return []
  }
}

export const upsertWord = (update: Partial<QuizItem> & Pick<QuizItem, 'characters'>): any => {
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
