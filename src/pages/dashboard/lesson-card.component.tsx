import React from 'react'
import { Link } from 'react-router-dom'

import { Lesson } from '../../data/types'
import { Draggable, DroppableProvided } from 'react-beautiful-dnd'

interface LessonCardProps {
  lesson: Lesson
  index: number
  edit: boolean
}

export const LessonCard = ({ lesson, index, edit }: LessonCardProps) => (
  <Draggable draggableId={lesson._id} index={index}>
    {provided => (
      <Link
        to={`/${lesson._id}`}
        key={lesson._id}
        className="bg-white border border-grey-light rounded overflow-hidden m-2 no-underline hover:shadow hover:bg-blue group transition-faster"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{ ...provided.draggableProps.style, width: 190 }}
        innerRef={provided.innerRef}
      >
        <div className="p-4">
          <h3 className="text-sm text-grey-dark uppercase mb-1 group-hover:text-blue-lightest transition-faster">
            Lesson {lesson.number}
          </h3>
          <h4 className="text-base text-inherit text-grey-darker group-hover:text-white  transition-faster">
            {lesson.title}
          </h4>
        </div>
      </Link>
    )}
  </Draggable>
)
