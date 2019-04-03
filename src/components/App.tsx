import { h, Component } from 'preact'

export class App extends Component {
  render() {
    return (
      <div>
        <h1>Imprint</h1>

        <div data-test-card>
          <div data-test-pinyin>wǒ</div>
          <div data-test-characters>我</div>
        </div>
      </div>
    )
  }
}
