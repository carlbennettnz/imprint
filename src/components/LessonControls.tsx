import { h, Fragment } from 'preact'
import { Link } from 'preact-router'

type LessonControlsProps = {
  lesson: any
  edit: boolean
  save: () => void
}

export const LessonControls = ({ lesson, edit, save }: LessonControlsProps) =>
  edit ? (
    <EditModeLessonControls save={save} lesson={lesson} />
  ) : (
    <ReadModeLessonControls lesson={lesson} />
  )

const secondaryButtonStyles =
  'text-grey-darker no-underline px-3 py-2 mr-3 text-xs font-bold uppercase rounded bg-grey-light border border-transparent border-grey ml-auto'
const primaryButtonStyles =
  'bg-green-light no-underline px-3 py-2 leading-none text-green-darker shadow border border-green rounded text-xs font-bold uppercase overflow-hidden'

const EditModeLessonControls = ({ save, lesson }: { save: () => void; lesson: any }) => (
  <Fragment>
    <Link href={`/lessons/${lesson.number}`} className={secondaryButtonStyles}>
      Cancel
      <span className="bg-grey text-grey-lightest p-2 ml-3 -mr-3 -my-2 normal-case">
        <span style={{ position: 'relative', top: 0 }}>esc</span>
      </span>
    </Link>

    <Link href={`/lessons/${lesson.number}`} className={primaryButtonStyles}>
      Save
      <span className="bg-green text-green-lightest p-2 ml-2 -mr-3 -my-2">
        <span style={{ position: 'relative', top: 2 }}>↩</span>
      </span>
    </Link>
  </Fragment>
)

export const ReadModeLessonControls = ({ lesson }: { lesson: any }) => (
  <Fragment>
    <Link href={`/lessons/${lesson.number}/edit`} className={secondaryButtonStyles}>
      Edit
      <span className="bg-grey text-grey-lightest p-2 ml-3 -mr-3 -my-2 normal-case">
        <span style={{ position: 'relative', top: 0 }}>e</span>
      </span>
    </Link>

    <Link href={`/lessons/${lesson.number}/quiz`} className={primaryButtonStyles}>
      ▶&nbsp;&nbsp;Start
      <span className="bg-green text-green-lightest p-2 ml-2 -mr-3 -my-2">
        <span style={{ position: 'relative', top: 2 }}>↩</span>
      </span>
    </Link>
  </Fragment>
)
