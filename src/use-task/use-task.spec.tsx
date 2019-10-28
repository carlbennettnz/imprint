import React from 'react'
import { create, act } from 'react-test-renderer'

import useTask, { Task } from './use-task'

const nextTick = () => new Promise(r => process.nextTick(r))

describe('use-task', () => {
  // it('executes task without yields', () => {
  //   return useTask(function*() {}).run()
  // })

  // it('yeilds unwrapped promise results', () => {
  //   return useTask(function*() {
  //     const x: number = yield Promise.resolve(1)
  //     expect(x).toEqual(1)
  //   }).run()
  // })

  // it('accepts plain yields', () => {
  //   return useTask(function*() {
  //     const x: number = yield 1
  //     expect(x).toEqual(1)
  //   }).run()
  // })

  it('works in an actual app', () => {
    let called = false

    const App = () => {
      useTask(function*() {
        called = true
      }).run()

      return null
    }

    create(<App />)
    expect(called).toBe(true)
  })

  it('halts if component is unmounted', async () => {
    let called = false
    let resolve: any
    const promise = new Promise(r => (resolve = r))

    const A = (props: { render: boolean }) => {
      return props.render ? <B /> : null
    }

    const B = () => {
      useTask(function*() {
        yield promise
        called = true
      }).run()

      return null
    }

    const root = create(<A render={true} />)
    expect(called).toBe(false)
    act(() => root.update(<A render={false} />))
    await nextTick()
    resolve()
    await nextTick()
    expect(called).toBe(false)
  })

  it('passes arguments through', async () => {
    let calledWith: any

    const A = () => {
      useTask(function*(x: number) {
        calledWith = x
      }).run(3)

      return null
    }

    create(<A />)
    expect(calledWith).toBe(3)
  })

  it('does not drop subsequent calls by default', async () => {
    let counter = 0
    let resolve: any
    let promise = new Promise(r => (resolve = r))

    const A = () => {
      const task = useTask(function*() {
        yield promise
        counter++
      })

      task.run()
      task.run()

      return null
    }

    create(<A />)
    resolve()
    await nextTick()
    expect(counter).toBe(2)
  })

  it('does drop subsequent calls if .drop() is called', async () => {
    let counter = 0
    let resolve: any
    let promise = new Promise(r => (resolve = r))

    const A = () => {
      const task = useTask(function*(x: number) {
        yield promise
        counter = x
      }).drop()

      task.run(1)
      task.run(2)

      return null
    }

    create(<A />)
    resolve()
    await nextTick()
    expect(counter).toBe(1)
  })

  it('does not drop non-overlapping calls, even if .drop() is called', async () => {
    let counter = 0

    const A = () => {
      const task = useTask(function*() {
        counter++
      }).drop()

      task.run()
      task.run()

      return null
    }

    create(<A />)
    await nextTick()
    expect(counter).toBe(2)
  })

  it('does restart if .restartable() is used', async () => {
    let counter = 0
    let resolve: any
    let promise = new Promise(r => (resolve = r))

    const A = () => {
      const task = useTask(function*(x: number) {
        yield promise
        counter = x
      }).restartable()

      task.run(1)
      task.run(2)

      return null
    }

    create(<A />)
    resolve()
    await nextTick()
    expect(counter).toBe(2)
  })

  it('does not drop non-overlapping calls, even if .restartable() is used', async () => {
    let counter = 0

    const A = () => {
      const task = useTask(function*() {
        counter++
      }).restartable()

      task.run()
      task.run()

      return null
    }

    create(<A />)
    await nextTick()
    expect(counter).toBe(2)
  })

  it('throws if the promise rejects', async () => {
    let reached = false
    let reject: any
    const promise = new Promise((_, r) => (reject = r))

    const A = () => {
      useTask(function*() {
        yield promise
        reached = true
      })
        .run()
        .catch(() => {})

      return null
    }

    create(<A />)
    reject()
    await nextTick()
    expect(reached).toBe(false)
  })

  it('allows the rejection to be caught', async () => {
    let reached = false
    let reject: any
    const promise = new Promise((_, r) => (reject = r))

    const A = () => {
      useTask(function*() {
        try {
          yield promise
        } catch (err) {
          reached = true
        }
      }).run()

      return null
    }

    create(<A />)
    reject()
    await nextTick()
    expect(reached).toBe(true)
  })

  it('runs on mount if .onMount() is called', async () => {
    let x = 0

    const App = (props: { text: string }) => {
      useTask(function*() {
        x++
      }).onMount()

      return <p>{props.text}</p>
    }

    const root = create(<App text={'a'} />)
    expect(x).toBe(1)
    act(() => root.update(<App text={'b'} />))
    expect(x).toBe(1)
  })
})
