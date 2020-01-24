import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getLessons, WordsSummary, getWordsSummary, saveLesson, deleteLesson } from '../../data/db'
import { Lesson } from '../../data/types'
import { SummaryCard } from './summary-card.component'
import useTask from '../../shared/use-task.hook'
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from 'react-beautiful-dnd'
import { Course } from './course.component'

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
  flex
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
  flex
`

interface DashboardProps {
  edit: boolean
}

export const Dashboard = ({ edit }: DashboardProps) => {
  const [courses, setCourses] = useState<Course[]>([])
  const [summary, setSummary] = useState<WordsSummary | null>(null)

  useTask(function*() {
    const [lessons, wordsSummary]: [Lesson[], WordsSummary] = yield Promise.all([
      getLessons(),
      getWordsSummary()
    ])

    const newCourses = lessons.reduce<Course[]>((cs, lesson) => {
      const course = cs.find(c => c.name === lesson.course)
      if (!course) return [...cs, { name: lesson.course, lessons: [lesson] }]
      return cs.map(c => (c === course ? { ...c, lessons: [...c.lessons, lesson] } : c))
    }, [])

    setCourses(newCourses)
    setSummary(wordsSummary)
  }).onMount()

  const saveCourse = useTask(function*(course: Course) {
    const setCourseName = (lesson: Lesson) => ({
      ...lesson,
      course: course.name
    })

    yield Promise.all(
      course.lessons //
        .map(setCourseName)
        .map(saveLesson)
    )
  })

  const deleteCourse = useTask(function*(course: Course) {
    const msg = `Are you sure you wish to delete “${course.name}”? Words and your attempt history will not be deleted.`
    if (!confirm(msg)) return
    yield Promise.all(course.lessons.map(deleteLesson))
    setCourses(cs => cs.filter(c => c !== course))
  })

  const onDragEnd: OnDragEndResponder = result => {
    if (!result.destination) return

    const fromCourse = courses.find(c => c.name === result.source.droppableId)!
    const toCourse = courses.find(c => c.name === result.destination!.droppableId)!
    const fromLessons = fromCourse.lessons.map(l => ({ ...l }))
    const toLessons = fromCourse === toCourse ? fromLessons : toCourse.lessons.map(l => ({ ...l }))
    const fromIdx = result.source.index
    const toIdx = result.destination.index

    const movedIdx = fromLessons.findIndex(lesson => lesson.number === result.source.index)
    const lessonsToSave = []

    for (const lesson of fromLessons) {
      if (fromIdx <= lesson.number) {
        lesson.number -= 1
        lessonsToSave.push(lesson)
      }
    }

    for (const lesson of toLessons) {
      if (toIdx <= lesson.number) {
        lesson.number += 1

        if (!lessonsToSave.includes(lesson)) {
          lessonsToSave.push(lesson)
        }
      }
    }

    const [moved] = fromLessons.splice(movedIdx, 1)
    moved.number = result.destination.index
    moved.course = result.destination.droppableId
    toLessons.push(moved)

    for (const lesson of lessonsToSave) {
      saveLesson(lesson)
    }

    setCourses(
      courses.map(c =>
        c === toCourse
          ? { ...toCourse, lessons: toLessons }
          : c === fromCourse
          ? { ...fromCourse, lessons: fromLessons }
          : c
      )
    )
  }

  return (
    <div className="max-w-lg w-full mx-auto mt-4 px-8">
      <header className="flex items-center mb-8 h-8">
        <h1 className="max-w-lg mr-auto font-sans text-xl my-0 text-blue">Imprint</h1>

        <div className="flex items-center">
          {!edit ? (
            <>
              <Link to={`/dashboard/edit`} className={secondaryButtonStyles}>
                <u>E</u>dit
              </Link>

              <Link to={`/add-words`} className={secondaryButtonStyles}>
                <u>A</u>dd Words
              </Link>

              <Link to={`/lessons/all/quiz`} className={primaryButtonStyles}>
                Revise Now
                <span className="bg-green text-green-lightest p-2 ml-2 -mr-3 -my-2">
                  <span style={{ position: 'relative', top: 2 }}>↩</span>
                </span>
              </Link>
            </>
          ) : (
            <Link to={`/dashboard`} className={primaryButtonStyles}>
              Done
              <span className="bg-green text-green-lightest p-2 ml-2 -mr-3 -my-2">
                <span>esc</span>
              </span>
            </Link>
          )}
        </div>
      </header>

      {summary && !edit && <SummaryCard summary={summary} />}

      <DragDropContext onDragEnd={onDragEnd}>
        {courses.map(course => (
          <Course
            key={course.name}
            course={course}
            edit={edit}
            saveCourse={saveCourse.run}
            deleteCourse={deleteCourse.run}
          />
        ))}
      </DragDropContext>
    </div>
  )
}
