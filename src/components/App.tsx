import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import { Quiz } from './Quiz'
import { Lessons } from './Lessons'

export class App extends Component {
  render() {
    return (
      <div className="py-4">
        {/* <header className="bg-white border-b border-grey-light py-4 mb-8">
          <h1 className="max-w-lg mx-auto font-sans text-2xl my-0 px-8 text-blue">Imprint</h1>
        </header> */}

        <Router>
          {['/', '/lessons'].includes(location.pathname) && <Redirect to="/lessons/1" />}
          <Route
            render={({ match }) => <Lessons edit={false} lesson={match.params.lesson} />}
            path="/lessons/:lesson"
            exact
          />
          <Route
            render={({ match }) => <Lessons edit={true} lesson={match.params.lesson} />}
            path="/lessons/:lesson/edit"
            exact
          />
          <Route
            render={({ match }) => <Quiz edit={true} lesson={match.params.lesson} />}
            path="/lessons/:lesson/quiz"
          />
        </Router>
      </div>
    )
  }
}
