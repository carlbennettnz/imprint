import { h, Component } from 'preact'

import { Card } from './Card'
import { QuizInput } from './QuizInput'

enum GuessStatus {
  right,
  wrong
}

type QuizItem = {
  zh: {
    pinyin: string
    characters: string
  }
  en: string[]
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

        {this.state.guessStatus === GuessStatus.wrong && (
          <div data-test-feedback>{LESSON[0].en.join(', ')}</div>
        )}
        <Card {...LESSON[0].zh} />
        <QuizInput submit={answer => this.checkAnswer(LESSON[0], answer)} />
      </div>
    )
  }
}
