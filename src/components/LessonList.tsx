import { h } from 'preact'
import { LESSONS } from '../data/lessons'
import { Link } from 'preact-router'

export const LessonsList = () => {
  const itemStyle =
    'text-grey-dark no-underline border border-transparent rounded flex px-4 py-2 flex'
  const activeItemStyle = `${itemStyle} bg-white border-grey-light`

  return (
    <div className="w-1/3 mr-4 rounded-lg px-4">
      <h1 className="max-w-lg mx-auto font-sans text-2xl my-0 px-4 mb-5 text-blue">Imprint</h1>
      <ol className="list-reset">
        {LESSONS.map(({ titleShort, slug }) => (
          <li>
            <Link
              className={location.pathname.includes(slug) ? activeItemStyle : itemStyle}
              href={`/lessons/${slug}`}
            >
              <span>{titleShort}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
