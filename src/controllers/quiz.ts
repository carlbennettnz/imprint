import { Lesson, QuizItem } from '../types/Lesson'
import { observable, computed } from 'mobx'

export class QuizController {
  @observable public questionStage: QuestionStage = QuestionStage.ASK
  @observable public currentQuestionIndex: number = 0
  @observable public responseHistory: boolean[][]

  constructor(private lesson: Lesson) {
    this.responseHistory = lesson.items.map(() => [])
  }

  @computed get currentQuestion(): QuizItem {
    return this.lesson.items[this.currentQuestionIndex]
  }

  @computed get currentQuestionHistory(): boolean[] {
    return this.responseHistory[this.currentQuestionIndex]
  }

  @computed get itemStatuses() {
    return this.lesson.items.map((item, i) => {
      const lastTwo = this.responseHistory[i].slice(-2)
      if (lastTwo.length === 0) return null
      if (!lastTwo.includes(false)) return true
      if (lastTwo[lastTwo.length - 1] === true) return null
      return false
    })
  }

  @computed get isComplete() {
    return this.itemStatuses.every(s => s === true)
  }

  advance(): void {
    const itemStatuses = this.lesson.items.map((item, i) => {
      const lastTwo = this.responseHistory[i].slice(-2)
      if (lastTwo.length === 0) return null
      if (!lastTwo.includes(false)) return true
      if (lastTwo[lastTwo.length - 1] === true) return null
      return false
    })

    let candidate = this.currentQuestionIndex

    // Already done
    if (itemStatuses.every(s => s === true)) return

    do {
      candidate = (candidate + 1) % itemStatuses.length
    } while (itemStatuses[candidate] === true)

    this.questionStage = QuestionStage.ASK
    this.currentQuestionIndex = candidate
  }

  submitAnswer(answer: string): void {
    const correct = this.currentQuestion.en
      .map(possibleAnswer => possibleAnswer.toLowerCase())
      .includes(answer.toLowerCase().trim())

    this.responseHistory[this.currentQuestionIndex].push(correct)
    this.questionStage = correct ? QuestionStage.CORRECT : QuestionStage.INCORRECT
  }
}

export enum QuestionStage {
  ASK,
  CORRECT,
  INCORRECT
}
