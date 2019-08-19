import React from 'react'
import { Link } from 'react-router-dom'

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

export const Dashboard = () => {
  return (
    <div className="max-w-lg mx-auto mt-4">
      <header className="flex items-center mb-8">
        <h1 className="max-w-lg mr-auto font-sans text-2xl my-0 text-blue">Imprint</h1>
        <div>
          <Link to={`/lessons/all/edit`} className={secondaryButtonStyles}>
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

      <div className="bg-white border border-grey-light rounded overflow-hidden flex mb-8">
        <div
          className="border-green border-b-8 p-4 whitespace-no-wrap overflow-hidden truncate"
          style={{ width: `${(356 / (356 + 89 + 52)) * 100}%` }}
        >
          356 words memorised
        </div>
        <div
          className="border-orange border-b-8 p-4 whitespace-no-wrap overflow-hidden truncate ml-1"
          style={{ width: `${(89 / (356 + 89 + 52)) * 100}%` }}
        >
          89 need revision
        </div>
        <div
          className="border-gray border-b-8 p-4 whitespace-no-wrap overflow-hidden truncate ml-1"
          style={{ width: `${(89 / (356 + 89 + 52)) * 100}%` }}
        >
          52 to learn
        </div>
      </div>

      <div>
        <header className="border-b border-grey py-2 px-4 mb-8">
          <h2 className="text-lg text-grey-darker">EuroAsia Mandarin 1</h2>
        </header>

        <div className="flex flex-wrap -m-2">
          <div
            className="bg-white border border-grey-light rounded overflow-hidden m-2"
            style={{ width: 'calc(33.333% - 1rem)' }}
          >
            <div className="p-4">
              <h3 className="text-sm text-grey-dark uppercase mb-1">Lesson 1</h3>
              <h4 className="text-base text-grey-darker">How are you?</h4>
            </div>
          </div>

          <div
            className="bg-white border border-grey-light rounded overflow-hidden m-2"
            style={{ width: 'calc(33.333% - 1rem)' }}
          >
            <div className="p-4">
              <h3 className="text-sm text-grey-dark uppercase mb-1">Lesson 2</h3>
              <h4 className="text-base text-grey-darker">What is your name?</h4>
            </div>
          </div>

          <div
            className="bg-white border border-grey-light rounded overflow-hidden m-2"
            style={{ width: 'calc(33.333% - 1rem)' }}
          >
            <div className="p-4">
              <h3 className="text-sm text-grey-dark uppercase mb-1">Lesson 3</h3>
              <h4 className="text-base text-grey-darker">What is your job?</h4>
            </div>
          </div>

          <div
            className="bg-white border border-grey-light rounded overflow-hidden m-2"
            style={{ width: 'calc(33.333% - 1rem)' }}
          >
            <div className="p-4">
              <h3 className="text-sm text-grey-dark uppercase mb-1">Lesson 4</h3>
              <h4 className="text-base text-grey-darker">Hobbies</h4>
            </div>
          </div>

          <div
            className="bg-white border border-grey-light rounded overflow-hidden m-2"
            style={{ width: 'calc(33.333% - 1rem)' }}
          >
            <div className="p-4">
              <h3 className="text-sm text-grey-dark uppercase mb-1">Lesson 5</h3>
              <h4 className="text-base text-grey-darker">Directions</h4>
            </div>
          </div>

          <div
            className="bg-white border border-grey-light rounded overflow-hidden m-2"
            style={{ width: 'calc(33.333% - 1rem)' }}
          >
            <div className="p-4">
              <h3 className="text-sm text-grey-dark uppercase mb-1">Lesson 6</h3>
              <h4 className="text-base text-grey-darker">Food</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
