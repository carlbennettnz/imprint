import React, { Component, FormEvent } from 'react'

type QuizInputProps = {
  submit: (answer: string) => void
}

export class QuizInput extends Component<QuizInputProps> {
  input: HTMLInputElement | null = null

  state = {
    answer: ''
  }

  componentDidMount() {
    if (this.input) this.input.focus()
  }

  updateAnswer(answer: string) {
    this.setState({ answer })
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (this.state.answer.trim().length > 0) {
      this.props.submit(this.state.answer)
    }
  }

  render() {
    return (
      <form
        className="w-full px-16"
        data-test-quiz-form
        onSubmit={(event: FormEvent) => this.handleSubmit(event)}
      >
        <input
          className="w-full text-2xl text-center py-2 border-b-2 outline-none focus:border-blue"
          data-test-quiz-input
          ref={input => {
            this.input = input
          }}
          value={this.state.answer}
          onChange={event => this.updateAnswer((event.target as HTMLInputElement).value)}
        />
      </form>
    )
  }
}
