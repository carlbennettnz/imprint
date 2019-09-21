import React, { ChangeEvent } from 'react'
import { QuizItem } from '../../types'

interface LessonItemRowProps {
  item: QuizItem
  update: (delta: Partial<QuizItem>) => void
  editable: boolean
  isLast: boolean
}

type SettableKey = 'characters' | 'pinyin' | 'en'

export const LessonItemRow = ({ item, update, editable, isLast }: LessonItemRowProps) => {
  const cellStyles = 'py-1 text-grey-darkest'
  let inputStyles =
    'w-full border-2 border-transparent focus:border-blue-light outline-none p-2 rounded text-black'

  if (editable) {
    inputStyles += ' hover:border-grey-light'
  }

  const handleChange = (key: SettableKey) => (event: ChangeEvent<HTMLInputElement>) => {
    const value: string | string[] = event.target.value
    const delta: Partial<QuizItem> = {}

    if (key === 'en') {
      delta.en = value.split(', ')
    } else {
      delta[key] = value
    }

    update(delta)
  }

  return (
    <tr className={isLast ? 'border-b' : ''}>
      <td className={`${cellStyles} text-xl w-16 pl-1`}>
        <input
          placeholder="字符"
          value={item.characters}
          disabled={!editable}
          className={inputStyles}
          onChange={handleChange('characters')}
        />
      </td>

      <td className={`${cellStyles} text-grey-dark w-48`}>
        <input
          placeholder="pinyin"
          value={item.pinyin}
          disabled={!editable}
          className={inputStyles}
          onChange={handleChange('pinyin')}
        />
      </td>

      <td className={`${cellStyles} pr-1`}>
        <input
          placeholder="en"
          value={item.en.join(', ')}
          disabled={!editable}
          className={inputStyles}
          onChange={handleChange('en')}
        />
      </td>
    </tr>
  )
}
