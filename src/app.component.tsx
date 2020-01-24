import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import { Dashboard } from './pages/dashboard/dashboard.component'
import { Lessons } from './pages/lesson/lesson.component'
import { Quiz } from './pages/quiz/quiz.component'
import { AddWords } from './pages/add-words/add-words.component'

export const App = () => (
  <div className="py-4 min-h-screen flex">
    <Router>
      <Switch>
        <Route component={Dashboard} path="/dashboard" exact />
        <Route render={() => <Dashboard edit={true} />} path="/dashboard/edit" exact />
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
        <Redirect from="/" exact to="/dashboard" />
      </Switch>
    </Router>
  </div>
)
