import React from 'react'
import { Link } from 'react-router-dom'

type QuizHeaderProps = { lesson: any }

export const QuizHeader = ({ lesson }: QuizHeaderProps) => (
  <header className="flex items-center h-8 mt-4 mb-16 pb-8 border-b">
    <Link to="/" className="font-sans text-xl my-0 text-blue no-underline font-bold">
      Imprint
    </Link>
    <span className="text-sm pt-1 text-grey px-4">▶</span>
    <h1 className="font-sans font-normal text-xl my-0 text-grey-darker">{lesson.course}</h1>
    <span className="text-sm pt-1 text-grey px-4">▶</span>
    <h1 className="font-sans font-normal text-xl my-0 text-grey-darker mr-auto">{lesson.title}</h1>
  </header>
)
