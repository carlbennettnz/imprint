import React from 'react'
import { render } from 'react-dom'

import { App } from './app.component'

const el = document.querySelector('#app')!

render(<App />, el)
