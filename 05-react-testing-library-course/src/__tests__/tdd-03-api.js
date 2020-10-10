import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-03-api'

jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

test('renders a form with title, content, tags, and a submit button', () => {
  const fakeUser = {
    id: 'user-id',
  }

  render(<Editor user={fakeUser} />)

  const fakePost = {
    title: 'Test Title',
    content: 'Text Content',
    tags: ['tag1', 'tag2'],
  }

  screen.getByLabelText(/title/i).value = fakePost.title

  screen.getByLabelText(/content/i).value = fakePost.content

  screen.getByLabelText(/tags/i).value = fakePost.tags.join(', ')

  const submitButton = screen.getByText(/submit/i)

  userEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenLastCalledWith({
    ...fakePost,
    userId: fakeUser.id,
  })

  expect(mockSavePost).toHaveBeenCalledTimes(1)
})
