import { h, Component } from 'preact'

import { LessonsList } from './LessonList'
import { Lesson } from './Lesson'
import { LESSONS } from '../data/lessons'

export class Lessons extends Component<{ lesson?: string }> {
  render() {
    const lesson = LESSONS[+(this.props.lesson || 1) - 1]

    return (
      <div className="flex max-w-lg mx-auto mt-4">
        <LessonsList />
        <Lesson lesson={lesson} />
      </div>
    )
  }
}
