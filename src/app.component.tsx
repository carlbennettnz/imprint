import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import { Dashboard } from './pages/dashboard/dashboard.component'
import { Lessons } from './pages/lesson/lesson.component'
import { Quiz } from './pages/quiz/quiz.component'
import { AddWords } from './pages/add-words/add-words.component'

export const App = () => (
  <div className="py-4 min-h-screen flex">
    <Router>
      {/* location.pathname === '/lessons' && <Redirect to="/lessons/1" /> */}
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
