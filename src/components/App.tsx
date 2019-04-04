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

export class App extends Component<{}, AppState> {
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
        <h1 className="max-w-xl mx-auto font-sans text-2xl mb-4 mt-4 px-8 text-blue">Imprint</h1>

        <div className="max-w-xl mx-auto bg-white p-8 my-4 shadow-md rounded-lg">
          <Card {...item.zh} />

          <div className="border-t -mb-8 -ml-8 -mr-8 p-8 mt-8 h-32 flex items-center">
            {!isSubmitted && <QuizInput submit={answer => this.setGuess(answer)} />}
            {isSubmitted && <Feedback item={item} answer={this.state.guess!} />}
          </div>
        </div>
      </div>
    )
  }
}
