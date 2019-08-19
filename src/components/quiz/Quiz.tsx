import React from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import { getLesson } from '../../data/db'

import { QuizContent } from './QuizContent'

interface QuizProps extends RouteComponentProps {
  lesson: string
}

export const Quiz = withRouter<QuizProps>((props: QuizProps) => {
  const lessonNumber = parseLessonNumber(props.lesson)
  const lesson = lessonNumber && getLesson(lessonNumber)

  return lesson ? (
    <QuizContent lesson={lesson} route={props.history.push} />
  ) : (
    <h1>Lesson not found</h1>
  )
})

const parseLessonNumber = (str: string): number | null => {
  const number = parseInt(str, 10)

  return !isNaN(number) && number != null && number >= 0 && number < Infinity ? number : null
}
