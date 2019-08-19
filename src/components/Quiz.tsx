import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { observer } from 'mobx-react-lite'

import { getLesson } from '../data/db'
import { QuizController, QuestionStage } from '../controllers/quiz'

import { Lesson } from '../types/Lesson'

import { Card } from './Card'
import { QuizInput } from './QuizInput'
import { Feedback } from './Feedback'
import { LessonStatus } from './LessonStatus'
import { QuizHeader } from './QuizHeader'

const ENTER_KEYCODE = 13

interface QuizParentProps extends RouteComponentProps {
  lesson: string
}

interface QuizChildProps {
  lesson: Lesson
  route: (path: string) => void
}

const QuizParent = (props: QuizParentProps) => {
  const lessonNumber = parseLessonNumber(props.lesson)
  const lesson = lessonNumber && getLesson(lessonNumber)

  return lesson ? (
    <QuizChild lesson={lesson} route={props.history.push} />
  ) : (
    <h1>Lesson not found</h1>
  )
}

const QuizChild = observer(({ lesson, route }: QuizChildProps) => {
  const [quiz] = useState(() => new QuizController(lesson))

  useKeyBinding(ENTER_KEYCODE, (event: KeyboardEvent) => {
    if (quiz.questionStage === QuestionStage.ASK) return

    event.preventDefault()

    if (quiz.isComplete) {
      route(`/lessons/${lesson.number}`)
    } else {
      quiz.advance()
    }
  })

  const isSubmitted = quiz.questionStage !== QuestionStage.ASK
  const item = quiz.currentQuestion
  const correct = quiz.questionStage === QuestionStage.CORRECT

  return (
    <div>
      <QuizHeader lesson={lesson} />

      <div className="max-w-md mx-auto bg-white p-8 border border-grey-light rounded-lg overflow-hidden">
        <Card characters={item.characters} pinyin={item.pinyin} />

        <div className="border-t border-grey-light -mb-8 -ml-8 -mr-8 p-8 mt-8 h-32 flex items-center">
          {!isSubmitted && <QuizInput submit={answer => quiz.submitAnswer(answer)} />}
          {isSubmitted && <Feedback item={item} correct={correct} complete={quiz.isComplete} />}
        </div>
      </div>

      <div className="max-w-md mx-auto px-8 py-4">
        <LessonStatus itemStatuses={quiz.itemStatuses} />
      </div>
    </div>
  )
})

const parseLessonNumber = (str: string): number | null => {
  const number = parseInt(str, 10)

  return !isNaN(number) && number != null && number >= 0 && number < Infinity ? number : null
}

const useKeyBinding = (keyCode: number, handler: (event: KeyboardEvent) => unknown) => {
  useEffect(() => {
    const filter = (event: KeyboardEvent) => {
      if (event.which === keyCode) {
        handler(event)
      }
    }

    document.addEventListener('keypress', filter)

    return () => {
      document.removeEventListener('keypress', filter)
    }
  })
}

export const Quiz = withRouter<QuizParentProps>(QuizParent)
