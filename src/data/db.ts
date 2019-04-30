import { openDB, IDBPDatabase } from 'idb'

export default {
  db: null as any,

  async init() {
    this.db = await openDB('imprint', 1, {
      upgrade(db, oldVersion) {
        switch (oldVersion) {
          case 0:
            upgradeToV1(db)
        }
      }
    })

    this.db.put('lessons', {
      number: 1,
      title: 'How are you?',
      items: [0, 1]
    })

    await this.db.put('lessons', {
      number: 2,
      title: 'What is your job?',
      items: [2, 3]
    })

    await this.db.put('items', {
      id: 0,
      characters: '我',
      pinyin: 'wǒ',
      meaning: ['I', 'me', 'myself']
    })

    await this.db.put('items', {
      id: 1,
      characters: '你',
      pinyin: 'nǐ',
      meaning: ['you']
    })

    await this.db.put('items', {
      id: 2,
      characters: '职业',
      pinyin: 'zhíyè',
      meaning: ['profession']
    })

    await this.db.put('items', {
      id: 2,
      characters: '工作',
      pinyin: 'gōngzuò',
      meaning: ['job']
    })
  },

  async getLessons() {
    return this.db.getAll('lessons')
  },

  async getLesson(id: number) {
    const lesson = await this.db.get('lessons', id)

    lesson.items = await this.getLessonContent(lesson)

    return lesson
  },

  async getLessonContent(lesson: any) {
    return await Promise.all(lesson.items.map((id: number) => this.db.get('items', id)))
  }
}

const upgradeToV1 = (db: IDBPDatabase) => {
  db.createObjectStore('lessons', {
    keyPath: 'number',
    autoIncrement: true
  })

  db.createObjectStore('items', {
    keyPath: 'id',
    autoIncrement: true
  })
}
