import React from 'react'

import { Lesson } from '../../data/types'
import { LessonCard } from './lesson-card.component'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'

export interface Course {
  name: string
  lessons: Lesson[]
}

interface CourseProps {
  course: Course
  edit: boolean
  saveCourse: (course: Course) => Promise<void>
  deleteCourse: (course: Course) => Promise<void>
}

export const Course = ({ course, edit, saveCourse, deleteCourse }: CourseProps) => (
  <div key={course.name}>
    <header className="border-b border-grey py-2 px-4 my-8 flex group">
      {edit ? (
        <>
          <input
            className="text-lg text-grey-darker font-bold bg-transparent px-0"
            defaultValue={course.name}
            onBlur={e => saveCourse({ ...course, name: e.target.value })}
          />

          <button
            className="ml-auto font-bold text-2xl -mt-4 -mr-4 -mb-4 p-4 invisible text-grey hover:text-red group-hover:visible"
            onClick={e => deleteCourse(course)}
          >
            &times;
          </button>
        </>
      ) : (
        <h2 className="text-lg text-grey-darker">{course.name}</h2>
      )}
    </header>

    <Droppable droppableId={course.name} key={course.name} direction="horizontal">
      {provided => (
        <div
          className="flex flex-wrap -m-2"
          style={{ minHeight: 57 }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {course.lessons
            .sort((a, b) => a.number - b.number)
            .map(lesson => (
              <LessonCard key={lesson._id} lesson={lesson} index={lesson.number} edit={edit} />
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
)
