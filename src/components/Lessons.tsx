import { h, Component } from 'preact'
import { Link } from 'preact-router'

const LESSONS = [
  { href: '/lesson-1', title: 'Lesson 1: How are you?' },
  { href: '/lesson-2', title: 'Lesson 2: What is your job?' }
]

export class Lessons extends Component {
  render() {
    return (
      <ol className="list-reset max-w-md p-4 mx-auto">
        {LESSONS.map(({ title, href }) => (
          <li className="mb-4">
            <Link
              className="text-grey-darkest no-underline bg-white border border-grey-light rounded-lg p-4 flex"
              href={href}
            >
              <span>{title}</span>
              <span className="ml-auto">→</span>
            </Link>
          </li>
        ))}
      </ol>
    )
  }
}
