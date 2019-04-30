import { h } from 'preact'

export const LessonContents = ({ lesson }: { lesson: any }) => {
  const cellStyles = 'p-3 text-grey-darkest'

  return (
    <div className="bg-white border rounded-lg mt-4">
      <table className="p-4 w-full">
        <tbody>
          {lesson.items.map((item: any, i: number) => (
            <tr className={i < lesson.items.length - 1 ? 'border-b' : ''}>
              <td className={`${cellStyles} text-xl w-16`}>{item.characters}</td>
              <td className={`${cellStyles} text-grey-dark`}>{item.pinyin}</td>
              <td className={`${cellStyles}`}>{item.meaning.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
