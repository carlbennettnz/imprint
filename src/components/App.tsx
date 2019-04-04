import { h, Component } from 'preact'

import { QuizItem } from '../types/QuizItem'
import { Card } from './Card'
import { QuizInput } from './QuizInput'
import { Feedback } from './Feedback'

enum GuessStatus {
  right,
  wrong
}

const LESSON: QuizItem[] = [
  { zh: { pinyin: 'wǒ', characters: '我' }, en: ['I', 'me', 'myself'] },
  { zh: { pinyin: 'nǐ', characters: '你' }, en: ['you'] }
]

const ENTER_KEYCODE = 13

type AppState = {
  guessStatus: GuessStatus | null
  currentIndex: number
}

export class App extends Component<null, AppState> {
  state = {
    guessStatus: null,
    currentIndex: 0
  }

  componentWillMount() {
    document.addEventListener('keypress', this.handleKeypress.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeypress.bind(this))
  }

  handleKeypress(event: KeyboardEvent) {
    if (event.keyCode !== ENTER_KEYCODE) return
    if (this.state.guessStatus === null) return

    event.preventDefault()

    this.setState({
      guessStatus: null,
      currentIndex: (this.state.currentIndex + 1) % LESSON.length
    })
  }

  checkAnswer(item: QuizItem, answer: string) {
    this.setState({
      guessStatus: GuessStatus.wrong
    })
  }

  render() {
    const isSubmitted = this.state.guessStatus
    const item = LESSON[this.state.currentIndex]

    return (
      <div>
        <h1>Imprint</h1>

        <Card {...item.zh} />
        {!isSubmitted && <QuizInput submit={answer => this.checkAnswer(LESSON[0], answer)} />}
        {isSubmitted && <Feedback item={item} />}
      </div>
    )
  }
}
