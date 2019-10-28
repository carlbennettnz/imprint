import { QuizController, QuestionStage } from './quiz.controller'
import { LESSONS as RAW_LESSONS, WORDS } from '../../data/fixtures'

const LESSONS = RAW_LESSONS.map(lesson => ({
  ...lesson,
  items: lesson.items.map(itemId => WORDS.find(w => w._id === itemId)!)
}))

const LONG_LESSON = {
  ...LESSONS[0],
  items: [...LESSONS[0].items, ...LESSONS[1].items]
}

const getQuiz = (lesson = LESSONS[0]) => new QuizController(lesson)

describe('QuizController', () => {
  it('starts with the first question in the lesson as the current question', () => {
    const quiz = getQuiz()
    expect(quiz.currentQuestion).toBe(LESSONS[0].items[0])
  })

  it('moves on to the next question after advance', () => {
    const quiz = getQuiz()
    quiz.advance()
    expect(quiz.currentQuestion).toBe(LESSONS[0].items[1])
  })

  it('wraps back to the start once all questions are passed', () => {
    const quiz = getQuiz()
    quiz.advance()
    quiz.advance()
    expect(quiz.currentQuestion).toBe(LESSONS[0].items[0])
  })

  it('reports no answer history for the current question on first visit', () => {
    const quiz = getQuiz()
    expect(quiz.currentQuestionHistory).toStrictEqual([])
  })

  it('reports a single correct response in history', () => {
    const quiz = getQuiz()
    quiz.submitAnswer('I')
    expect(quiz.currentQuestionHistory).toStrictEqual([true])
  })

  it('reports a single correct response in history', () => {
    const quiz = getQuiz()
    quiz.submitAnswer('wrong')
    expect(quiz.currentQuestionHistory).toStrictEqual([false])
  })

  it('reports a combination of correct and incorrect responses in history', () => {
    const quiz = getQuiz()
    quiz.submitAnswer('wrong')
    quiz.submitAnswer('I')
    quiz.submitAnswer('wrong')
    expect(quiz.currentQuestionHistory).toStrictEqual([false, true, false])
  })

  it('accepts perfectly spelled response', () => {
    const quiz = getQuiz()
    quiz.submitAnswer('I')
    expect(quiz.questionStage).toBe(QuestionStage.CORRECT)
  })

  it('accepts any capitalisation in response', () => {
    const quiz = getQuiz()
    quiz.submitAnswer('i')
    expect(quiz.questionStage).toBe(QuestionStage.CORRECT)
  })

  it('skips over questions that were correctly answered on the first guess', () => {
    const quiz = getQuiz(LONG_LESSON)
    quiz.submitAnswer('i')
    quiz.advance() // 2
    quiz.advance() // 3
    quiz.advance() // 4
    quiz.advance() // 2
    expect(quiz.currentQuestion).toBe(LONG_LESSON.items[1])
  })

  it('does not skip over questions if they were answered incorrectly, then correctly', () => {
    const quiz = getQuiz(LONG_LESSON)
    quiz.submitAnswer('nope')
    quiz.advance() // 2
    quiz.advance() // 3
    quiz.advance() // 4
    quiz.advance() // 1
    quiz.submitAnswer('i')
    quiz.advance() // 2
    quiz.advance() // 3
    quiz.advance() // 4
    quiz.advance() // 1
    expect(quiz.currentQuestion).toBe(LONG_LESSON.items[0])
  })

  it('does skip over questions if they were answered incorrectly, then correctly twice in a row', () => {
    const quiz = getQuiz(LONG_LESSON)
    quiz.submitAnswer('nope')
    quiz.advance() // 2
    quiz.advance() // 3
    quiz.advance() // 4
    quiz.advance() // 1
    quiz.submitAnswer('i')
    quiz.advance() // 2
    quiz.advance() // 3
    quiz.advance() // 4
    quiz.advance() // 1
    quiz.advance() // 1
    quiz.submitAnswer('i')
    quiz.advance() // 2
    quiz.advance() // 3
    quiz.advance() // 4
    quiz.advance() // 2
    expect(quiz.currentQuestion).toBe(LONG_LESSON.items[1])
  })

  it('still wraps to the start even if the last question is complete', () => {
    const quiz = getQuiz(LONG_LESSON)
    quiz.advance() // 2
    quiz.advance() // 3
    quiz.advance() // 4
    quiz.submitAnswer('job')
    quiz.advance() // 1
    quiz.advance() // 2
    quiz.advance() // 3
    quiz.advance() // 1
    expect(quiz.currentQuestion).toBe(LONG_LESSON.items[0])
  })

  it('reports completion if all questions are answered', () => {
    const quiz = getQuiz(LONG_LESSON)
    quiz.submitAnswer('i')
    quiz.advance() // 2
    quiz.submitAnswer('you')
    quiz.advance() // 3
    quiz.submitAnswer('profession')
    quiz.advance() // 4
    expect(quiz.isComplete).toBe(false)
    quiz.submitAnswer('job')
    expect(quiz.isComplete).toBe(true)
  })
})
