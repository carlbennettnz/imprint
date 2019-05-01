import { h } from 'preact'
import { LessonControls } from './LessonControls'
import { LessonContents } from './LessonContents'

export const Lesson = ({ lesson, edit }: { lesson: any; edit: boolean }) => (
  <div className="w-full">
    <header className="flex items-center">
      <h2 className="text-base text-grey-darker px-4">
        Lesson {lesson.number}: {lesson.title}
      </h2>

      <LessonControls lesson={lesson} edit={edit} save={() => {}} />
    </header>

    <LessonContents items={lesson.items} isEditable={edit} updateItem={() => {}} />
  </div>
)
