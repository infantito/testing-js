import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Main} from '../main'

test('main renders about and home and I can navigate to those pages', () => {
  window.history.pushState({}, 'Test page', '/')

  render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>,
  )

  /**
   * https://testing-library.com/docs/dom-testing-library/api-queries#level
   * The level option queries the element(s) with the heading role matching
   * the indicated level determined by the semantic HTML heading elements
   * <h1>-<h6> or matching the aria-level attribute.
   */
  expect(screen.getByRole('heading')).toHaveTextContent(/home/i)

  userEvent.click(screen.getByText(/about/i))

  expect(screen.getByRole('heading')).toHaveTextContent(/about/i)
})
