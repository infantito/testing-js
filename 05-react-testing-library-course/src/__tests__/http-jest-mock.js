import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {loadGreeting as mockLoadGreeting} from '../api'
import {GreetingLoader} from '../greeting-loader-01-mocking'

jest.mock('../api.js')

test('loads greetings on click', async () => {
  const testGreeting = 'TEST_GREETING'

  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})

  render(<GreetingLoader />)

  const nameInput = screen.getByLabelText(/name/i)

  const loadButton = screen.getByText(/load/i)

  userEvent.type(nameInput, 'Mary')

  userEvent.click(loadButton)

  expect(mockLoadGreeting).toHaveBeenLastCalledWith('Mary')

  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)

  await waitFor(() => {
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(testGreeting)
  })
})
