import { useEffect, useState } from 'react'

export class Task {
  private isStopped = false
  private doDrop = false
  private doRestart = false
  private hasRunForMount = false
  private running: Iterator<any, any, any>[] = []

  constructor(public generator: (...args: any[]) => Iterator<any, void, any>) {}

  run = async (...args: any[]): Promise<void> => {
    if (this.doDrop && this.running.length > 0) {
      return
    }

    if (this.doRestart) {
      this.running.forEach(g => g.return!())
      this.running = []
    }

    const gen = this.generator(...args)
    this.running.push(gen)

    const doShit = async ({ done, value }: IteratorResult<any, void>): Promise<void> => {
      if (done || this.isStopped) {
        this.running = this.running.filter(g => g !== gen)
      } else {
        try {
          const result = await value

          if (!this.isStopped) {
            return doShit(gen.next(result))
          }
        } catch (err) {
          if (!this.isStopped) {
            gen.throw!(err)
          }
        }
      }
    }

    return doShit(gen.next())
  }

  get isRunning() {
    return this.running.length > 0
  }

  drop() {
    this.doDrop = true
    return this
  }

  restartable() {
    this.doRestart = true
    return this
  }

  onMount() {
    if (!this.hasRunForMount) {
      this.hasRunForMount = true
      this.run()
      return this
    }
  }

  stop() {
    this.isStopped = true
  }
}

export default (taskFn: (...args: any[]) => Iterator<any, void, any>): Task => {
  // Create the task once and store in component state
  const task = useState(() => new Task(taskFn))[0]

  useEffect(() => {
    task.generator = taskFn
  })

  // Stop the task on unmount
  useEffect(() => {
    return () => task.stop()
  }, [])

  return task
}
