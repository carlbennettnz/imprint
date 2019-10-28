import React, { useState } from 'react'
import { QuizItem } from '../../data/types'
import { LessonItemRow } from '../lesson/lesson-item-row.component'
import uuid from '../../shared/uuid.util'
import { addWords } from '../../data/db'
import useTask from '../../shared/use-task.hook'

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

export const AddWords = () => {
  const [items, setItems] = useState<QuizItem[]>([getBlankItem()])

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

  const saveTask = useTask(function*(event: React.FormEvent<HTMLFormElement>, items) {
    event.preventDefault()

    const nonBlankItems = items.filter(
      (item: QuizItem) => item.characters.length > 0 || item.pinyin.length > 0 || item.en.length > 0
    )

    yield addWords(nonBlankItems)
  })

  return (
    <div className="max-w-lg mx-auto mt-4 px-8 flex flex-grow flex-col">
      <header className="flex items-center mb-8">
        <h1 className="max-w-lg font-sans text-xl my-0 text-blue">Add Words</h1>
      </header>

      <form onSubmit={event => saveTask.run(event, items)} className="flex flex-grow flex-col">
        <div className="bg-white border rounded-lg flex-grow">
          <table className="p-4 w-full">
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
          {/* <input
            value={lessonName}
            onChange={event => setLessonName(event.target.value)}
            placeholder="Lesson Name"
          />

          <button
            className={isSaving ? disabledButtonStyles : primaryButtonStyles}
            disabled={isSaving}
          >
            Save As Lesson
          </button> */}

          <button
            className={saveTask.isRunning ? disabledButtonStyles : primaryButtonStyles}
            disabled={saveTask.isRunning}
          >
            Save New Words
          </button>
        </div>
      </form>
    </div>
  )
}

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
