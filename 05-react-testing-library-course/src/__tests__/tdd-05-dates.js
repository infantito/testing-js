import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Redirect as MockRedirect} from 'react-router'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-05-dates'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()

  const fakeUser = {
    id: 'user-id',
  }

  render(<Editor user={fakeUser} />)

  const preDate = new Date().getTime()

  const fakePost = {
    title: 'Test Title',
    content: 'Test Content',
    date: expect.any(String),
    tags: ['tag1', 'tag2'],
  }

  screen.getByLabelText(/title/i).value = fakePost.title

  screen.getByLabelText(/content/i).value = fakePost.content

  screen.getByLabelText(/tags/i).value = fakePost.tags.join(', ')

  const submitButton = screen.getByText(/submit/i)

  userEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    userId: fakeUser.id,
  })

  /**
   * We just care that it is sometime before the form is submitted but after
   * the form is successfully saved, and realistically in our test that's going
   * to be just a couple milliseconds difference, but it makes our test really
   * resilient.
   */

  const postDate = new Date().getTime()

  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()

  expect(date).toBeGreaterThanOrEqual(preDate)

  expect(date).toBeLessThanOrEqual(postDate)

  expect(mockSavePost).toHaveBeenCalledTimes(1)

  // {to: ...} => props
  // {} => context
  await waitFor(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})
