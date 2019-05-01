import { h } from 'preact'

type LessonContentProps = {
  items: any[]
  isEditable: boolean
  updateItem: (event: Event) => void
}

export const LessonContents = ({ items, isEditable, updateItem }: LessonContentProps) => {
  return (
    <div className="bg-white border rounded-lg mt-4">
      <table className="p-4 w-full">
        <tbody>
          {items.map((item: any, i: number) => (
            <LessonItemRow
              item={item}
              update={(event: Event) => updateItem(event)}
              editable={isEditable}
              isLast={i < items.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const LessonItemRow = ({ item, update, editable, isLast }: any) => {
  const cellStyles = 'py-1 text-grey-darkest'
  let inputStyles =
    'w-full border-2 border-transparent focus:border-blue-light outline-none p-2 rounded text-black'

  if (editable) {
    inputStyles += ' hover:border-grey-light'
  }

  return (
    <tr key={item.id} className={isLast ? 'border-b' : ''}>
      <td className={`${cellStyles} text-xl w-16 pl-1`}>
        <input
          name={`items[${item.id}].characters`}
          placeholder="字符"
          value={item.characters}
          disabled={!editable}
          className={inputStyles}
          onInput={update}
        />
      </td>

      <td className={`${cellStyles} text-grey-dark w-48`}>
        <input
          name={`items[${item.id}].pinyin`}
          placeholder="pinyin"
          value={item.pinyin}
          disabled={!editable}
          className={inputStyles}
          onInput={update}
        />
      </td>

      <td className={`${cellStyles} pr-1`}>
        <input
          name={`items[${item.id}].meaning`}
          placeholder="meaning"
          value={item.meaning.join(', ')}
          disabled={!editable}
          className={inputStyles}
          onInput={update}
        />
      </td>
    </tr>
  )
}
