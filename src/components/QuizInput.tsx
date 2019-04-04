import { h, Component } from 'preact'

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

  handleSubmit(event: Event) {
    event.preventDefault()
    this.props.submit(this.state.answer)
  }

  render() {
    return (
      <form data-test-quiz-form onSubmit={(event: Event) => this.handleSubmit(event)}>
        <input
          data-test-quiz-input
          ref={input => { this.input = input }}
          value={this.state.answer}
          onInput={event => this.updateAnswer((event.target as HTMLInputElement).value)}
        />
      </form>
    )
  }
)
