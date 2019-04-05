import { h, Component } from 'preact'
import { Link, route } from 'preact-router'

import { Card } from './Card'
import { QuizInput } from './QuizInput'
import { Feedback } from './Feedback'
import { LESSONS } from '../data/lessons'
import { QuizItem } from '../types/QuizItem'
import { LessonStatus } from './LessonStatus'

const ENTER_KEYCODE = 13

type QuizProps = {
  lesson?: string
}

type QuizState = {
  correct: boolean | null
  currentIndex: number
  progress: Map<QuizItem, boolean[]>
}

export class Quiz extends Component<QuizProps, QuizState> {
  state = {
    correct: null,
    currentIndex: 0,
    progress: new Map<QuizItem, boolean[]>()
  }

  get lesson() {
    return LESSONS.find(({ slug }) => slug === this.props.lesson)!
  }

  get isComplete(): boolean {
    return this.lesson.items.every(item => this.itemIsComplete(item))
  }

  get itemStatuses(): (boolean | null)[] {
    return this.lesson.items.map(item => {
      const history = this.itemHistory(item)
      if (history.length === 0) return null
      if (!history.includes(false)) return true
      if (history[history.length - 1] === true) return null
      return false
    })
  }

  itemIsComplete(item: QuizItem): boolean {
    const history = this.itemHistory(item)
    return history.length > 0 && !history.includes(false)
  }

  itemHistory(item: QuizItem): boolean[] {
    const history = this.state.progress.get(item)
    return history ? history.slice(-2) : []
  }

  componentWillMount() {
    document.addEventListener('keypress', this.handleKeypress.bind(this))
    this.setState({
      correct: null,
      currentIndex: 0,
      progress: new Map()
    })
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeypress.bind(this))
  }

  handleKeypress(event: KeyboardEvent) {
    if (event.keyCode !== ENTER_KEYCODE) return
    if (this.state.correct === null) return

    console.log(this.state.correct, this.isComplete)

    event.preventDefault()

    if (this.isComplete) {
      route('/')
    } else {
      this.setState({
        correct: null,
        currentIndex: (this.state.currentIndex + 1) % this.lesson.items.length
      })
    }
  }

  makeGuess(answer: string) {
    const item = this.lesson.items[this.state.currentIndex]
    const correct = item.en.map(a => a.toLowerCase()).includes(answer.toLowerCase().trim())
    const progress = new Map(this.state.progress)

    progress.set(item, [...(progress.get(item) || []), correct])

    this.setState({ correct, progress })
  }

  render() {
    const isSubmitted = this.state.correct !== null
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
        </header>

        <div className="max-w-md mx-auto bg-white p-8 border border-grey-light rounded-lg overflow-hidden">
          <Card {...item.zh} />

          <div className="border-t border-grey-light -mb-8 -ml-8 -mr-8 p-8 mt-8 h-32 flex items-center">
            {!isSubmitted && <QuizInput submit={answer => this.makeGuess(answer)} />}
            {isSubmitted && (
              <Feedback item={item} correct={this.state.correct!} complete={this.isComplete} />
            )}
          </div>
        </div>

        <div className="max-w-md mx-auto px-8 py-4">
          <LessonStatus itemStatuses={this.itemStatuses} />
        </div>
      </div>
    )
  }
}
