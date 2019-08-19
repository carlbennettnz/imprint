import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import { QuizController, QuestionStage } from '../../controllers/quiz'
import { Lesson } from '../../types'
import { useKeyBinding } from '../../utils/use-key-binding'

import { QuizCard } from './QuizCard'
import { QuizInput } from './QuizInput'
import { QuizFeedback } from './QuizFeedback'
import { LessonStatus } from '../lesson/LessonStatus'
import { QuizHeader } from './QuizHeader'

const ENTER_KEYCODE = 13

interface QuizContentProps {
  lesson: Lesson
  route: (path: string) => void
}

export const QuizContent = observer(({ lesson, route }: QuizContentProps) => {
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
        <QuizCard characters={item.characters} pinyin={item.pinyin} />

        <div className="border-t border-grey-light -mb-8 -ml-8 -mr-8 p-8 mt-8 h-32 flex items-center">
          {!isSubmitted && <QuizInput submit={answer => quiz.submitAnswer(answer)} />}
          {isSubmitted && <QuizFeedback item={item} correct={correct} complete={quiz.isComplete} />}
        </div>
      </div>

      <div className="max-w-md mx-auto px-8 py-4">
        <LessonStatus itemStatuses={quiz.itemStatuses} />
      </div>
    </div>
  )
})
