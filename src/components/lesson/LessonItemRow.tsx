import React, { ChangeEvent } from 'react'
import { QuizItem } from '../../types'

interface LessonItemRowProps {
  index: number
  item: QuizItem
  update: (event: ChangeEvent<HTMLInputElement>) => void
  editable: boolean
  isLast: boolean
}

export const LessonItemRow = ({
  index: key,
  item,
  update,
  editable,
  isLast
}: LessonItemRowProps) => {
  const cellStyles = 'py-1 text-grey-darkest'
  let inputStyles =
    'w-full border-2 border-transparent focus:border-blue-light outline-none p-2 rounded text-black'

  if (editable) {
    inputStyles += ' hover:border-grey-light'
  }

  return (
    <tr key={key} className={isLast ? 'border-b' : ''}>
      <td className={`${cellStyles} text-xl w-16 pl-1`}>
        <input
          name={`items[${item.id}].characters`}
          placeholder="字符"
          value={item.characters}
          disabled={!editable}
          className={inputStyles}
          onChange={update}
        />
      </td>

      <td className={`${cellStyles} text-grey-dark w-48`}>
        <input
          name={`items[${item.id}].pinyin`}
          placeholder="pinyin"
          value={item.pinyin}
          disabled={!editable}
          className={inputStyles}
          onChange={update}
        />
      </td>

      <td className={`${cellStyles} pr-1`}>
        <input
          name={`items[${item.id}].en`}
          placeholder="en"
          value={item.en.join(', ')}
          disabled={!editable}
          className={inputStyles}
          onChange={update}
        />
      </td>
    </tr>
  )
}
