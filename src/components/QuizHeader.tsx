import { h } from 'preact'
import { Link } from 'preact-router'

type QuizHeaderProps = { lesson: any }

export const QuizHeader = ({ lesson }: QuizHeaderProps) => (
  <header className="max-w-md mx-auto px-8 py-4 flex">
    <Link href="/" className="text-grey-dark hover:text-blue no-underline cursor-pointer">
      ← Lessons
    </Link>
    <h2 className="text-base text-grey-darker">Lesson {lesson.number}</h2>
  </header>
)
