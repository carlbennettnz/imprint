import { h } from 'preact'

import { QuizItem } from '../types/QuizItem'

type FeedbackProps = {
  item: QuizItem
  answer: string
}

export const Feedback = ({ item, answer }: FeedbackProps) => (
  <div data-test-feedback>{item.en.includes(answer) ? 'Correct!' : item.en.join(', ')}</div>
)
