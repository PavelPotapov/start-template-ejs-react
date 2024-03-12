import React from 'react'
import CardComponent from './Card.jsx'

import { createRoot } from 'react-dom/client'

export default class CardR {
  constructor() {
    this.init()
  }

  init() {
    const container = document.querySelector('#root')
    const root = createRoot(container) // createRoot(container!) if you use TypeScript
    root.render(<CardComponent />)
  }
}
