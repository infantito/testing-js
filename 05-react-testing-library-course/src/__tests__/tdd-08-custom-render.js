import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import {build, fake, sequence} from 'test-data-bot'
import userEvent from '@testing-library/user-event'
import {Redirect as MockRedirect} from 'react-router'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-08-custom-render'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs().replace(/\r/g, '')),
  tags: fake(f => [f.lorem.words(), f.lorem.words(), f.lorem.words()]),
})

const userBuilder = build('User').fields({
  id: sequence(s => `user-${s}`),
})

function renderEditor() {
  const fakeUser = userBuilder()

  const utils = render(<Editor user={fakeUser} />)

  const fakePost = postBuilder()

  screen.getByLabelText(/title/i).value = fakePost.title

  screen.getByLabelText(/content/i).value = fakePost.content

  screen.getByLabelText(/tags/i).value = fakePost.tags.join(', ')

  const submitButton = screen.getByText(/submit/i)

  return {
    ...utils,
    submitButton,
    fakeUser,
    fakePost,
  }
}

test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()

  const {fakeUser, fakePost, submitButton} = renderEditor()

  const preDate = new Date().getTime()

  userEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
    userId: fakeUser.id,
  })

  expect(mockSavePost).toHaveBeenCalledTimes(1)

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

  // {to: ...} => props
  // {} => context
  await waitFor(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})

test('renders an error message from the server', async () => {
  const testError = 'test error'

  mockSavePost.mockRejectedValueOnce({data: {error: testError}})

  const {container, submitButton} = renderEditor()

  const form = container.querySelector('form')

  fireEvent.submit(form)

  const postError = await screen.findByRole('alert')

  expect(postError).toHaveTextContent(testError)

  expect(submitButton).toBeEnabled()
})
