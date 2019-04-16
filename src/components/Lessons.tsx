import { h, Component } from 'preact'
import { Link } from 'preact-router'

import { LESSONS } from '../data/lessons'

export class Lessons extends Component {
  render() {
    return (
      <ol className="list-reset max-w-md p-4 mx-auto">
        {LESSONS.map(({ titleLong, slug }) => (
          <li className="mb-4">
            <Link
              className="text-grey-darkest no-underline bg-white border border-grey-light rounded-lg p-4 flex"
              href={`/lessons/${slug}/quiz`}
            >
              <span>{titleLong}</span>
              <span className="ml-auto">→</span>
            </Link>
          </li>
        ))}
      </ol>
    )
  }
}
