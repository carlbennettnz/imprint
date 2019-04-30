import { h } from 'preact'
import { Link } from 'preact-router'
import { LessonContents } from './LessonContents'

export const Lesson = ({ lesson }: { lesson: any }) => (
  <div className="w-full">
    <header className="flex items-center">
      <h2 className="text-base text-grey-darker px-4">
        Lesson {lesson.number}: {lesson.title}
      </h2>

      <LessonControls lesson={lesson} />
    </header>

    <LessonContents lesson={lesson} />
  </div>
)

const LessonControls = ({ lesson }: { lesson: any }) => {
  const startButtonStyles =
    'bg-green-light no-underline px-3 py-2 leading-none text-green-darker shadow border border-green rounded text-xs font-bold uppercase ml-auto overflow-hidden'

  return (
    <Link href={`/lessons/${lesson.number}/quiz`} className={startButtonStyles}>
      ▶&nbsp;&nbsp;Start
      <span className="bg-green text-green-lightest p-2 ml-2 -mr-3 -my-2">
        <span style={{ position: 'relative', top: 2 }}>↩</span>
      </span>
    </Link>
  )
}
