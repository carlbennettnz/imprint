import { h } from 'preact'
import { Link } from 'preact-router'

export const Lesson = ({ lesson }: { lesson: any }) => {
  const cellStyles = 'p-3 text-grey-darkest'
  const startButtonStyles =
    'bg-green-light no-underline px-3 py-2 leading-none text-green-darker shadow border border-green rounded text-xs font-bold uppercase ml-auto overflow-hidden'

  return (
    <div className="w-full">
      <header className="flex items-center">
        <h2 className="text-base text-grey-darker px-4">
          Lesson {lesson.number}: {lesson.title}
        </h2>

        <Link href={`/lessons/${lesson.number}/quiz`} className={startButtonStyles}>
          ▶&nbsp;&nbsp;Start
          <span className="bg-green text-green-lightest p-2 ml-2 -mr-3 -my-2">
            <span style={{ position: 'relative', top: 2 }}>↩</span>
          </span>
        </Link>
      </header>

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
    </div>
  )
}
