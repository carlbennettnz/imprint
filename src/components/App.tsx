import { h, Component } from 'preact'

import { Card } from './Card'

const LESSON = [{ zh: { pinyin: 'wǒ', characters: '我' }, en: ['I', 'me', 'myself'] }]

export class App extends Component {
  render() {
    return (
      <div>
        <h1>Imprint</h1>

        <Card {...LESSON[0].zh} />
      </div>
    )
  }
}
