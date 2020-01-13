import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import { getLesson } from '../../data/db'

import { QuizContent } from './quiz-content.component'
import { Lesson } from '../../data/types'
import useTask from '../../shared/use-task.hook'

interface QuizProps extends RouteComponentProps {
  lesson: string
}

export const Quiz = withRouter<QuizProps>((props: QuizProps) => {
  const [lesson, setLesson] = useState<Lesson | null>(null)

  const loadTask = useTask(function*() {
    if (!props.lesson) return
    setLesson(yield getLesson(props.lesson))
  }).onMount()

  if (loadTask?.isRunning) return null

  return (
    <div className="max-w-lg w-full mx-auto mt-4 px-8">
      {lesson ? (
        <QuizContent lesson={lesson} route={props.history.push} />
      ) : (
        <h1>Lesson not found</h1>
      )}
    </div>
  )
})
