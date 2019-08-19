import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import { Quiz } from './Quiz'
import { Lessons } from './Lessons'

export const App = () => (
  <div className="py-4">
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
