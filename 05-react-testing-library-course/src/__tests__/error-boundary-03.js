import React from 'react'
import {render, screen} from '@testing-library/react'
import {reportError as mockReportError} from '../api'
import {ErrorBoundary} from '../error-boundary'
import userEvent from '@testing-library/user-event'

jest.mock('../api')

// this is only here to make the error output not appear in the project's output
// even though in the course we don't include this bit and leave it in it's incomplete state.
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  /**
   * we have to ensure that all of the mocks that we have by default from
   * the API module have all been cleared after every one of the test because
   * in our expect's we're getting our mockReportError called.
   */
  jest.clearAllMocks()

  console.error.mockRestore()
})

function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('💣')
  }

  return null
}

test('calls reportError and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true})

  const {rerender} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  )

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true} />
    </ErrorBoundary>,
  )

  const error = expect.any(Error)

  const info = {componentStack: expect.stringContaining('Bomb')}

  expect(mockReportError).toHaveBeenCalledWith(error, info)

  expect(mockReportError).toHaveBeenCalledTimes(1)

  // 1 for jest-dom
  // 1 for react-dom
  expect(console.error).toHaveBeenCalledTimes(2)

  console.error.mockClear()

  mockReportError.mockClear()

  rerender(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  )

  userEvent.click(screen.getByText(/try again/i))

  expect(mockReportError).not.toHaveBeenCalled()

  expect(console.error).not.toHaveBeenCalled()

  expect(screen.queryByRole('alert')).not.toBeInTheDocument()

  expect(screen.queryByText(/try again/i)).not.toBeInTheDocument()
})
