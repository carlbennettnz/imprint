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
        <header className="bg-white border-b border-grey-light py-4 mb-8">
          <h1 className="max-w-md mx-auto font-sans text-2xl my-0 px-8 text-blue">Imprint</h1>
        </header>

        <header className="max-w-md mx-auto px-8 py-4 flex">
          <a className="text-grey-dark mr-auto">← Lessons</a>
          <h2 className="text-base text-grey-darker">Lesson 1</h2>
          <div className="text-grey ml-auto opacity-0">← Lessons</div> {/* just for alignment */}
        </header>

        <div className="max-w-md mx-auto bg-white p-8 mb-8 border border-grey-light rounded-lg overflow-hidden">
          <Card {...item.zh} />

          <div className="border-t border-grey-light -mb-8 -ml-8 -mr-8 p-8 mt-8 h-32 flex items-center">
            {!isSubmitted && <QuizInput submit={answer => this.setGuess(answer)} />}
            {isSubmitted && <Feedback item={item} answer={this.state.guess!} />}
          </div>
        </div>
      </div>
    )
  }
}
