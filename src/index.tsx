import { h, render } from 'preact'

import db from './data/db'
import { App } from './components/App'

const el = document.querySelector('#app')!

db.init().then(() => render(<App />, el))
