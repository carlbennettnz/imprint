import { h } from 'preact'

type CardProps = {
  pinyin: string
  characters: string
}

export const Card = ({ pinyin, characters }: CardProps) => (
  <div data-test-card>
    <div data-test-pinyin>{pinyin}</div>
    <div data-test-characters>{characters}</div>
  </div>
)
