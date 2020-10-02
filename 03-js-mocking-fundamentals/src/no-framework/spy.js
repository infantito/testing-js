/**
 * Task: implement a `spyOn`.
 *
 * Execute: Use `npx jest --watch src/no-framework/spy.js` to watch the test
 */

const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = {calls: []}

  mockFn.mockImplementation = newImpl => (impl = newImpl)

  return mockFn
}

function spyOn(obj, prop) {
  const originalValue = obj[prop]

  obj[prop] = fn()
  obj[prop].mockRestore = () => (obj[prop] = originalValue)
}

spyOn(utils, 'getWinner')
utils.getWinner.mockImplementation((p1, p2) => p2)

const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')

assert.strictEqual(winner, 'Kent C. Dodds')
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ['Ken Wheeler', 'Kent C. Dodds'],
  ['Ken Wheeler', 'Kent C. Dodds'],
])

// cleanup
utils.getWinner.mockRestore()

/**
 * Checkout master branch to see the answer.
 */
