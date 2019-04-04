import { h, Component } from 'preact'

import { QuizItem } from '../types/QuizItem'
import { Card } from './Card'
import { QuizInput } from './QuizInput'
import { Feedback } from './Feedback'

const LESSON: QuizItem[] = [
  { zh: { pinyin: 'wǒ', characters: '我' }, en: ['I', 'me', 'myself'] },
  { zh: { pinyin: 'nǐ', characters: '你' }, en: ['you'] }
]

const ENTER_KEYCODE = 13

type AppState = {
  guess: string | null
  currentIndex: number
}

export class App extends Component<null, AppState> {
  state = {
    guess: null,
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
    if (this.state.guess === null) return

    event.preventDefault()

    this.setState({
      guess: null,
      currentIndex: (this.state.currentIndex + 1) % LESSON.length
    })
  }

  setGuess(answer: string) {
    this.setState({ guess: answer })
  }

  render() {
    const isSubmitted = this.state.guess !== null
    const item = LESSON[this.state.currentIndex]

    return (
      <div>
        <h1>Imprint</h1>

        <Card {...item.zh} />
        {!isSubmitted && <QuizInput submit={answer => this.setGuess(answer)} />}
        {isSubmitted && <Feedback item={item} answer={this.state.guess!} />}
      </div>
    )
  }
}
