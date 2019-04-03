import { h, render } from 'preact'

import { App } from './components/App'

const el = document.querySelector('#app')!

render(<App />, el)
