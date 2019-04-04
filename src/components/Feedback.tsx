import { h } from 'preact'

import { QuizItem } from '../types/QuizItem'

type FeedbackProps = {
  item: QuizItem
}

export const Feedback = ({ item }: FeedbackProps) => (
  <div data-test-feedback>{item.en.join(', ')}</div>
)
