import { h } from 'preact'

import { QuizItem } from '../types/QuizItem'

type FeedbackProps = {
  item: QuizItem
  correct: boolean
  complete: boolean
}

export const Feedback = ({ item, correct, complete }: FeedbackProps) => (
  <div className="mx-auto">
    <div className="text-center text-xl" data-test-feedback>
      {complete ? 'Lesson complete!' : correct ? 'Correct!' : item.en.join(', ')}
    </div>

    <div className="text-grey mt-2" data-test-instruction>
      Press enter to {complete ? 'return to the lesson list' : 'continue'}
    </div>
  </div>
)
