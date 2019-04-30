import { h } from 'preact'
import { LessonControls } from './LessonControls'
import { LessonContents } from './LessonContents'

export const Lesson = ({ lesson }: { lesson: any }) => (
  <div className="w-full">
    <header className="flex items-center">
      <h2 className="text-base text-grey-darker px-4">
        Lesson {lesson.number}: {lesson.title}
      </h2>

      <LessonControls lesson={lesson} edit={false} save={() => {}} />
    </header>

    <LessonContents lesson={lesson} />
  </div>
)
