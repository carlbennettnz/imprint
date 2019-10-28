import { RawLesson, QuizItem } from 'src/types'

export const LESSONS: RawLesson[] = [
  {
    _id: 'lessons/1',
    _rev: undefined,
    course: 'EuroAsia Mandarin 1',
    number: 1,
    title: 'How are you?',
    items: ['words/1', 'words/2']
  },
  {
    _id: 'lessons/2',
    _rev: undefined,
    course: 'EuroAsia Mandarin 1',
    number: 2,
    title: 'What is your job?',
    items: ['words/3', 'words/4']
  },
  {
    _id: 'lessons/3',
    _rev: undefined,
    course: 'EuroAsia Mandarin 1',
    number: 3,
    title: 'Hobbies',
    items: ['words/3', 'words/4']
  },
  {
    _id: 'lessons/4',
    _rev: undefined,
    course: 'EuroAsia Mandarin 1',
    number: 4,
    title: 'Directions',
    items: ['words/3', 'words/4']
  },
  {
    _id: 'lessons/5',
    _rev: undefined,
    course: 'EuroAsia Mandarin 1',
    number: 5,
    title: 'Food',
    items: ['words/3', 'words/4']
  },
  {
    _id: 'lessons/6',
    _rev: undefined,
    course: 'EuroAsia Mandarin 1',
    number: 6,
    title: 'What is your job?',
    items: ['words/3', 'words/4']
  }
]

export const WORDS: QuizItem[] = [
  {
    _id: 'words/1',
    _rev: undefined,
    pinyin: 'wǒ',
    characters: '我',
    en: ['I', 'me', 'myself'],
    status: 'LEARNED',
    history: []
  },
  {
    _id: 'words/2',
    _rev: undefined,
    pinyin: 'nǐ',
    characters: '你',
    en: ['you'],
    status: 'LEARNED',
    history: []
  },
  {
    _id: 'words/3',
    _rev: undefined,
    pinyin: 'zhíyè',
    characters: '职业',
    en: ['profession'],
    status: 'NEEDS_REVIEW',
    history: []
  },
  {
    _id: 'words/4',
    _rev: undefined,
    pinyin: 'gōngzuò',
    characters: '工作',
    en: ['job'],
    status: 'UNLEARNED',
    history: []
  }
]
