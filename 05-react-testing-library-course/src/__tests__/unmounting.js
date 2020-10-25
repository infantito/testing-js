import React from 'react'
import {render, act} from '@testing-library/react'
import {Countdown} from '../countdown'

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
})

afterEach(() => {
  jest.clearAllMocks()

  /**
   * if we had any other tests in here that weren't expecting jest.useFakeTimers,
   * that would be problematic. Before each one of our tests, we'll set Jest to
   * use real timers.
   */
  jest.useRealTimers()
})

test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  /**
   * What we need to do is use Jest feature for fake timer so that we can make
   * this happen quicker.
   */
  jest.useFakeTimers()

  const {unmount} = render(<Countdown />)

  unmount()

  /**
   * we'll call jest.runOnlyPendingTimers so we can make sure that if there is
   * a problem, we'll be made aware of it. We make our assertion that console
   * error was not called.
   */
  act(() => jest.runOnlyPendingTimers())

  expect(console.error).not.toHaveBeenCalled()
})
