import React, { useState } from 'react'
import { QuizItem, Lesson } from '../../data/types'
import uuid from '../../shared/uuid.util'
import { addLesson } from '../../data/db'
import useTask from '../../shared/use-task.hook'
import { withRouter, RouteComponentProps } from 'react-router'
import { LessonItemRow } from '../lesson/lesson-item-row.component'
import { Link } from 'react-router-dom'

const baseButtonStyles = `
no-underline
px-3
py-2
leading-none
shadow
border
rounded
text-xs
font-bold
uppercase
overflow-hidden
`

const primaryButtonStyles = `
  ${baseButtonStyles}
  bg-green-light
  text-green-darker
  border-green
`

const disabledButtonStyles = `
  ${baseButtonStyles}
  bg-grey
  text-grey-lighter
  border-grey
  cursor-default
`

const fieldStyles = `
  mb-4
  flex
  flex-col
`

const labelStyles = `
  block
  text-sm
  pb-1
  uppercase
  font-bold
  text-grey-dark
`

const textInputStyles = `
  border
  p-2
`

export const AddWords = withRouter<RouteComponentProps>(({ history }) => {
  const [items, setItems] = useState<QuizItem[]>([getBlankItem()])
  const [collectionType, setCollectionType] = useState<'lesson' | 'misc'>('lesson')
  const [courseName, setCourseName] = useState<string>('')
  const [lessonName, setLessonName] = useState<string>('')

  const handleCollectionTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (['lesson', 'misc'].includes(event.target.value)) {
      setCollectionType(event.target.value as 'lesson' | 'misc')
    }
  }

  const update = (item: QuizItem) => (delta: Partial<QuizItem>) => {
    const updatedItem = { ...item, ...delta }
    const newItems = items.map((existing: QuizItem) =>
      existing._id === item._id ? updatedItem : existing
    )

    // Add a new blank row at the end if we've edited the existing blank row
    const last = newItems[newItems.length - 1]
    const lastIsModified = last.characters !== '' || last.pinyin !== '' || last.en.length > 0

    if (lastIsModified) {
      newItems.push(getBlankItem())
    }

    setItems(newItems)
  }

  const saveTask = useTask(function*(event: React.FormEvent<HTMLFormElement>, items: QuizItem[]) {
    event.preventDefault()

    const nonBlankItems = items.filter(
      (item: QuizItem) => item.characters.length > 0 || item.pinyin.length > 0 || item.en.length > 0
    )

    const lesson: Lesson = {
      _id: `lessons/${uuid()}`,
      _rev: undefined,
      course: collectionType === 'lesson' ? courseName : '__special__',
      title: collectionType === 'lesson' ? lessonName : 'misc',
      number: 0, // will auto-increment on save
      items: nonBlankItems
    }

    yield addLesson(lesson)

    history.push('/')
  })

  return (
    <div className="max-w-lg w-full mx-auto mt-4 px-8 flex flex-grow flex-col">
      <header className="flex items-center mb-8 h-8">
        <Link to="/" className="font-sans text-xl my-0 text-blue no-underline font-bold">
          Imprint
        </Link>
        <span className="text-sm pt-1 text-grey px-4">▶</span>
        <h1 className="font-sans font-normal text-xl my-0 text-grey-darker">Add Words</h1>
      </header>

      <div className="flex flex-grow items-start">
        <div className="bg-white rounded-lg border w-1/3 mr-4 p-6 text-grey-darker">
          <section>
            <label className="mb-2 inline-block">
              <input
                type="radio"
                name="words-type"
                value="misc"
                checked={collectionType === 'misc'}
                onChange={handleCollectionTypeChange}
                className="mr-2"
              />
              Miscellaneous
            </label>

            <br />

            <label>
              <input
                type="radio"
                name="words-type"
                value="lesson"
                checked={collectionType === 'lesson'}
                onChange={handleCollectionTypeChange}
                className="mr-2"
              />
              Lesson
            </label>
          </section>

          {collectionType === 'lesson' ? (
            <section className="pt-6 border-t mt-6 -mb-4">
              <div className={fieldStyles}>
                <label htmlFor="course-name" className={labelStyles}>
                  Course Name
                </label>
                <input
                  type="text"
                  name="course-name"
                  className={textInputStyles}
                  value={courseName}
                  onChange={e => setCourseName(e.target.value)}
                />
              </div>

              <div className={fieldStyles}>
                <label htmlFor="lesson-name" className={labelStyles}>
                  Lesson Name
                </label>
                <input
                  type="text"
                  name="lesson-name"
                  className={textInputStyles}
                  value={lessonName}
                  onChange={e => setLessonName(e.target.value)}
                />
              </div>
            </section>
          ) : null}
        </div>

        <form
          onSubmit={event => saveTask.run(event, items)}
          className="flex flex-grow self-stretch flex-col"
        >
          <div className="bg-white border rounded-lg flex-grow p-2">
            <table className="w-full">
              <tbody>
                {items.map((item: QuizItem, i: number) => (
                  <LessonItemRow
                    key={item._id}
                    item={item}
                    update={update(item)}
                    editable={!saveTask.isRunning}
                    isLast={i < items.length - 1}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end py-4">
            <button
              className={saveTask.isRunning ? disabledButtonStyles : primaryButtonStyles}
              disabled={saveTask.isRunning}
            >
              Save New Words
            </button>
          </div>
        </form>
      </div>
    </div>
  )
})

const getBlankItem = (): QuizItem => {
  return {
    _id: `words/${uuid()}`,
    _rev: undefined,
    characters: '',
    pinyin: '',
    en: [],
    history: [],
    status: 'UNLEARNED'
  }
}
