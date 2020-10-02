import {getFlyingSuperHeros} from '../super-heros'

test('returns super heros that can fly', () => {
  const flyingHeros = getFlyingSuperHeros()

  expect(flyingHeros).toMatchInlineSnapshot(`
    Array [
      Object {
        "powers": "fly x",
      },
      Object {
        "powers": "fly y",
      },
      Object {
        "powers": "fly z",
      },
    ]
  `)
})
