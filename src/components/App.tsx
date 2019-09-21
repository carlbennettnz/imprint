import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import { Dashboard } from './dashboard/Dashboard'
import { Lessons } from './lesson/Lessons'
import { Quiz } from './quiz/Quiz'
import { AddWords } from './add-words/AddWords'

export const App = () => (
  <div className="py-4 min-h-screen flex">
    <Router>
      {['/lessons'].includes(location.pathname) && <Redirect to="/lessons/1" />}
      <Route component={Dashboard} path="/" exact />
      <Route component={AddWords} path="/add-words" exact />
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
        render={({ match }) => <Quiz lesson={match.params.lesson} />}
        path="/lessons/:lesson/quiz"
      />
    </Router>
  </div>
)
