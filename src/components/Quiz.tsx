import { h, Component } from 'preact'
import { Link } from 'preact-router'

import { Card } from './Card'
import { QuizInput } from './QuizInput'
import { Feedback } from './Feedback'
import { LESSONS } from '../data/lessons'

const ENTER_KEYCODE = 13

type QuizProps = {
  lesson?: string
}

type QuizState = {
  guess: string | null
  currentIndex: number
}

export class Quiz extends Component<QuizProps, QuizState> {
  state = {
    guess: null,
    currentIndex: 0
  }

  get lesson() {
    return LESSONS.find(({ slug }) => slug === this.props.lesson)!
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
      currentIndex: (this.state.currentIndex + 1) % this.lesson.items.length
    })
  }

  setGuess(answer: string) {
    this.setState({ guess: answer })
  }

  render() {
    const isSubmitted = this.state.guess !== null
    const item = this.lesson.items[this.state.currentIndex]

    return (
      <div>
        <header className="max-w-md mx-auto px-8 py-4 flex">
          <Link
            href="/"
            className="text-grey-dark mr-auto hover:text-blue no-underline cursor-pointer"
          >
            ← Lessons
          </Link>
          <h2 className="text-base text-grey-darker">{this.lesson.titleShort}</h2>
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
