import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { RouterProps } from 'react-router'

import { Card } from './Card'
import { QuizInput } from './QuizInput'
import { Feedback } from './Feedback'
import { QuizItem } from '../types/QuizItem'
import { LessonStatus } from './LessonStatus'
import { getLesson } from '../data/db'
import { QuizHeader } from './QuizHeader'

const ENTER_KEYCODE = 13

type QuizProps = {
  lesson: string
} & RouterProps

export const Quiz = withRouter((props: QuizProps) => {
  const lesson = useLesson(+props.lesson)
  const [getItemHistory, addItemGuess] = useItemHistory()
  const [correct, setCorrect] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useKeyBinding(ENTER_KEYCODE, (event: KeyboardEvent) => {
    if (correct === null || lesson === null) return

    event.preventDefault()

    if (isComplete) {
      props.history.push(`/lessons/${props.lesson}`)
    } else {
      setCorrect(null)
      setCurrentIndex(getNextQuestionIndex())
    }
  })

  const itemIsComplete = (item: QuizItem): boolean => {
    const history = getItemHistory(item)
    return history.length > 0 && !history.includes(false)
  }

  if (!lesson) return null

  const itemStatuses = lesson.items.map((item: any) => {
    const history = getItemHistory(item)
    if (history.length === 0) return null
    if (!history.includes(false)) return true
    if (history[history.length - 1] === true) return null
    return false
  })

  const getNextQuestionIndex = (): number => {
    let candidate = currentIndex

    if (itemStatuses.every((s: boolean) => s === true)) {
      return candidate
    }

    do {
      candidate = (candidate + 1) % itemStatuses.length
    } while (itemStatuses[candidate] === true)

    return candidate
  }

  const makeGuess = (answer: string) => {
    const item = lesson.items[currentIndex]
    const correct = item.en
      .map((a: string) => a.toLowerCase())
      .includes(answer.toLowerCase().trim())

    addItemGuess(item, correct)
    setCorrect(correct)
  }

  const isComplete = lesson.items.every(itemIsComplete)
  const isSubmitted = correct !== null
  const item = lesson.items[currentIndex]

  return (
    <div>
      <QuizHeader lesson={lesson} />

      <div className="max-w-md mx-auto bg-white p-8 border border-grey-light rounded-lg overflow-hidden">
        <Card characters={item.characters} pinyin={item.pinyin} />

        <div className="border-t border-grey-light -mb-8 -ml-8 -mr-8 p-8 mt-8 h-32 flex items-center">
          {!isSubmitted && <QuizInput submit={answer => makeGuess(answer)} />}
          {isSubmitted && <Feedback item={item} correct={correct!} complete={isComplete} />}
        </div>
      </div>

      <div className="max-w-md mx-auto px-8 py-4">
        <LessonStatus itemStatuses={itemStatuses} />
      </div>
    </div>
  )
})

const useLesson = (lessonNumber: number) => {
  const [lesson, setLesson] = useState<any>(null)

  useEffect(() => {
    setLesson(getLesson(lessonNumber))
  }, [lessonNumber])

  return lesson
}

const useItemHistory = (): [(item: any) => boolean[], (item: any, correct: boolean) => void] => {
  const [history, setHistory] = useState(new Map<QuizItem, boolean[]>())

  const getItemHistory = (item: QuizItem): boolean[] => {
    const itemHistory = history.get(item)
    return itemHistory ? itemHistory.slice(-2) : []
  }

  const addItemGuess = (item: any, correct: boolean): void => {
    const newHistory = new Map(history)
    newHistory.set(item, [...(history.get(item) || []), correct])
    setHistory(newHistory)
  }

  return [getItemHistory, addItemGuess]
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
