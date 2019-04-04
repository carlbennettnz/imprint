import { h, Component } from 'preact'

import { QuizItem } from '../types/QuizItem'
import { Card } from './Card'
import { QuizInput } from './QuizInput'
import { Feedback } from './Feedback'

enum GuessStatus {
  right,
  wrong
}

const LESSON: QuizItem[] = [{ zh: { pinyin: 'wǒ', characters: '我' }, en: ['I', 'me', 'myself'] }]

type AppState = {
  guessStatus: GuessStatus | null
}

export class App extends Component<null, AppState> {
  state = {
    guessStatus: null
  }

  checkAnswer(item: QuizItem, answer: string) {
    this.setState({
      guessStatus: GuessStatus.wrong
    })
  }

  render() {
    return (
      <div>
        <h1>Imprint</h1>

        {this.state.guessStatus === GuessStatus.wrong && <Feedback item={LESSON[0]} />}
        <Card {...LESSON[0].zh} />
        <QuizInput submit={answer => this.checkAnswer(LESSON[0], answer)} />
      </div>
    )
  }
}
