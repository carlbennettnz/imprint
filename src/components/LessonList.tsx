import React from 'react'
import { Link } from 'react-router-dom'

type LessonsListProps = { lessons: any[] }

export const LessonsList = ({ lessons }: LessonsListProps) => {
  const itemStyle =
    'text-grey-dark no-underline border border-transparent rounded flex px-4 py-2 flex'
  const activeItemStyle = `${itemStyle} bg-white border-grey-light`

  return (
    <div className="w-1/3 mr-4 rounded-lg px-4">
      <h1 className="max-w-lg mx-auto font-sans text-2xl my-0 px-4 mb-5 text-blue">Imprint</h1>
      <ol className="list-reset">
        {lessons.map(({ number }) => (
          <li key={number}>
            <Link
              className={location.pathname.includes(number) ? activeItemStyle : itemStyle}
              to={`/lessons/${number}`}
            >
              <span>Lesson {number}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
