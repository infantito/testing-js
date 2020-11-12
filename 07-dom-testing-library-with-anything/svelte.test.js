import '@testing-library/jest-dom/extend-expect'
import {userEventAsync} from './user-event-async'
import {getQueriesForElement, waitFor} from '@testing-library/dom'
import Counter from './counter.svelte'
import userEvent from '@testing-library/user-event'

function render(Component) {
  const container = document.createElement('div')

  new Component({target: container})

  return {
    ...getQueriesForElement(container),
    container,
  }
}

test('counter increments', async () => {
  const {getByText} = render(Counter)

  const counter = getByText('0')

  userEvent.click(counter)

  await waitFor(() => expect(counter).toHaveTextContent('1'))

  userEvent.click(counter)

  await waitFor(() => expect(counter).toHaveTextContent('2'))
})
