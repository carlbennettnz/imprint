import { h, Component } from 'preact'
import Router from 'preact-router'

import { Quiz } from './Quiz'
import { Lessons } from './Lessons'

export class App extends Component {
  render() {
    return (
      <div>
        <header className="bg-white border-b border-grey-light py-4 mb-8">
          <h1 className="max-w-md mx-auto font-sans text-2xl my-0 px-8 text-blue">Imprint</h1>
        </header>

        <Router>
          <Lessons path="/" />
          <Quiz path="/:lesson" />
        </Router>
      </div>
    )
  }
}
