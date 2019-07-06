import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

type LessonControlsProps = {
  lesson: any
  edit: boolean
  save: () => void
}

export function LessonControls({ lesson, edit, save }: LessonControlsProps) {
  return edit ? (
    <EditModeLessonControls save={save} lesson={lesson} />
  ) : (
    <ReadModeLessonControls lesson={lesson} />
  )
}

const secondaryButtonStyles =
  'text-grey-darker no-underline px-3 py-2 mr-3 text-xs font-bold uppercase rounded bg-grey-light border border-transparent border-grey ml-auto'
const primaryButtonStyles =
  'bg-green-light no-underline px-3 py-2 leading-none text-green-darker shadow border border-green rounded text-xs font-bold uppercase overflow-hidden'

function EditModeLessonControls({ save, lesson }: { save: () => void; lesson: any }) {
  return (
    <Fragment>
      <Link to={`/lessons/${lesson.number}`} className={secondaryButtonStyles}>
        Cancel
        <span className="bg-grey text-grey-lightest p-2 ml-3 -mr-3 -my-2 normal-case">
          <span style={{ position: 'relative', top: 0 }}>esc</span>
        </span>
      </Link>

      <a onClick={save} className={primaryButtonStyles + ' cursor-pointer'}>
        Save
        <span className="bg-green text-green-lightest p-2 ml-2 -mr-3 -my-2">
          <span style={{ position: 'relative', top: 2 }}>↩</span>
        </span>
      </a>
    </Fragment>
  )
}

export function ReadModeLessonControls({ lesson }: { lesson: any }) {
  return (
    <Fragment>
      <Link to={`/lessons/${lesson.number}/edit`} className={secondaryButtonStyles}>
        Edit
        <span className="bg-grey text-grey-lightest p-2 ml-3 -mr-3 -my-2 normal-case">
          <span style={{ position: 'relative', top: 0 }}>e</span>
        </span>
      </Link>

      <Link to={`/lessons/${lesson.number}/quiz`} className={primaryButtonStyles}>
        ▶&nbsp;&nbsp;Start
        <span className="bg-green text-green-lightest p-2 ml-2 -mr-3 -my-2">
          <span style={{ position: 'relative', top: 2 }}>↩</span>
        </span>
      </Link>
    </Fragment>
  )
}
