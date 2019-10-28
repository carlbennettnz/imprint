import React from 'react'

type CardProps = {
  pinyin: string
  characters: string
}

export const QuizCard = ({ pinyin, characters }: CardProps) => (
  <div data-test-card>
    <div data-test-pinyin className="text-xl text-center text-grey-dark">
      {pinyin}
    </div>
    <div data-test-characters className="text-5xl text-center my-2">
      {characters}
    </div>
  </div>
)
