import { h } from 'preact'

import { QuizItem } from '../types/QuizItem'

type FeedbackProps = {
  item: QuizItem
  answer: string
}

export const Feedback = ({ item, answer }: FeedbackProps) => (
  <div className="mx-auto">
    <div className="text-center text-xl" data-test-feedback>
      {item.en.map(a => a.toLowerCase()).includes(answer.toLowerCase().trim())
        ? 'Correct!'
        : item.en.join(', ')}
    </div>

    <div className="text-grey mt-2">Press enter to continue</div>
  </div>
)
