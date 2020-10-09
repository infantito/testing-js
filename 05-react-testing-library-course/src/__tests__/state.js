import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

test('entering an invalid value shows an error message', () => {
  render(<FavoriteNumber />)

  const input = screen.getByLabelText(/favorite number/i)

  fireEvent.change(input, {target: {value: 10}})

  expect(screen.getByRole('alert')).toHaveTextContent(/the number is invalid/i)
})
