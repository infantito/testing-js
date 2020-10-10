import React from 'react'
import {render} from '@testing-library/react'
import {reportError as mockReportError} from '../api'
import {ErrorBoundary} from '../error-boundary'

jest.mock('../api')

afterEach(() => {
  /**
   * we have to ensure that all of the mocks that we have by default from
   * the API module have all been cleared after every one of the test because
   * in our expect's we're getting our mockReportError called.
   */
  jest.clearAllMocks()
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
})
