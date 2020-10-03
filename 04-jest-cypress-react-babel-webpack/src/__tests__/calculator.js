import React from 'react'
import {render} from '@testing-library/react'
const {default: Calculator} = require('calculator')

test('renders', () => {
  render(<Calculator />)
})
