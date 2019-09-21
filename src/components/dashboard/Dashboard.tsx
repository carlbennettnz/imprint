import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getLessons, WordsSummary, getWordsSummary } from '../../data/db'
import { Lesson } from '../../types'
import { SummaryCard } from './SummaryCard'

const secondaryButtonStyles = `
  text-grey-darker
  no-underline
  px-3
  py-2
  mr-3
  text-xs
  font-bold
  uppercase
  rounded
  bg-grey-light
  border
  border-transparent
  border-grey
  ml-auto
`

const primaryButtonStyles = `
  bg-green-light
  no-underline
  px-3
  py-2
  leading-none
  text-green-darker
  shadow
  border
  border-green
  rounded
  text-xs
  font-bold
  uppercase
  overflow-hidden
`

interface Course {
  name: string
  lessons: Lesson[]
}

export const Dashboard = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [summary, setSummary] = useState<WordsSummary | null>(null)

  useEffect(() => {
    console.log('loading lessons')
    getLessons().then(lessons => {
      const newCourses = lessons.reduce<Course[]>((cs, lesson) => {
        const course = cs.find(c => c.name === lesson.course)
        if (!course) return [...cs, { name: lesson.course, lessons: [lesson] }]
        return cs.map(c => (c === course ? { ...c, lessons: [...c.lessons, lesson] } : c))
      }, [])

      setCourses(newCourses)
    }, console.error)
  }, [])

  useEffect(() => {
    getWordsSummary().then(setSummary, console.error)
  }, [])

  return (
    <div className="max-w-lg mx-auto mt-4 px-8">
      <header className="flex items-center mb-8">
        <h1 className="max-w-lg mr-auto font-sans text-2xl my-0 text-blue">Imprint</h1>
        <div>
          <Link to={`/add-words`} className={secondaryButtonStyles}>
            <u>A</u>dd Words
          </Link>
          <Link to={`/lessons/all/quiz`} className={primaryButtonStyles}>
            Revise Now
            <span className="bg-green text-green-lightest p-2 ml-2 -mr-3 -my-2">
              <span style={{ position: 'relative', top: 2 }}>↩</span>
            </span>
          </Link>
        </div>
      </header>

      {summary && <SummaryCard summary={summary} />}

      {courses.map(({ name, lessons }) => (
        <div key={name}>
          <header className="border-b border-grey py-2 px-4 mb-8">
            <h2 className="text-lg text-grey-darker">{name}</h2>
          </header>
          <div className="flex flex-wrap -m-2">
            {lessons.map(lesson => (
              <Link
                to={`/${lesson._id}`}
                key={lesson._id}
                className="bg-white border border-grey-light rounded overflow-hidden m-2 no-underline hover:shadow hover:bg-blue group transition-faster"
                style={{ width: 'calc(33.333% - 1rem)' }}
              >
                <div className="p-4">
                  <h3 className="text-sm text-grey-dark uppercase mb-1 group-hover:text-blue-lightest transition-faster">
                    Lesson {lesson.number}
                  </h3>
                  <h4 className="text-base text-inherit text-grey-darker group-hover:text-white  transition-faster">
                    {lesson.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
