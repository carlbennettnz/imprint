import React, { useState, useEffect } from 'react'
import { QuizItem } from '../../types'
import { LessonItemRow } from '../lesson/LessonItemRow'
import uuid from '../../utils/uuid'
import { addWords } from '../../data/db'

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
  const [isSaving, setIsSaving] = useState(false)

  const update = (item: QuizItem) => (delta: Partial<QuizItem>) => {
    const updatedItem = { ...item, ...delta }
    const newItems = items.map(existing => (existing === item ? updatedItem : existing))

    // Add a new blank row at the end if we've edited the existing blank row
    const last = newItems[newItems.length - 1]
    const lastIsModified = last.characters !== '' || last.pinyin !== '' || last.en.length > 0

    if (lastIsModified) {
      newItems.push(getBlankItem())
    }

    setItems(newItems)
  }

  const save = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSaving(true)
  }

  useEffect(() => {
    let isMounted = true
    if (!isSaving) return

    const nonBlankItems = items.filter(
      item => item.characters.length > 0 || item.pinyin.length > 0 || item.en.length > 0
    )

    addWords(nonBlankItems).then(words => {
      if (!isMounted) return
      setIsSaving(false)
    })

    return () => {
      isMounted = false
    }
  }, [isSaving])

  return (
    <div className="max-w-lg mx-auto mt-4 px-8 flex flex-grow flex-col">
      <header className="flex items-center mb-8">
        <h1 className="max-w-lg font-sans text-xl my-0 text-blue">Add Words</h1>
      </header>

      <form onSubmit={save} className="flex flex-grow flex-col">
        <div className="bg-white border rounded-lg flex-grow">
          <table className="p-4 w-full">
            <tbody>
              {items.map((item: QuizItem, i: number) => (
                <LessonItemRow
                  key={item._id}
                  item={item}
                  update={update(item)}
                  editable={!isSaving}
                  isLast={i < items.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end py-4">
          <button
            className={isSaving ? disabledButtonStyles : primaryButtonStyles}
            disabled={isSaving}
          >
            Save New Words
          </button>
        </div>
      </form>
    </div>
  )
}

const getBlankItem = () => {
  return {
    _id: `words/${uuid()}`,
    characters: '',
    pinyin: '',
    en: [],
    history: [],
    status: 'UNLEARNED'
  }
}
