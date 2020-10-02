import {getFlyingSuperHeros} from '../super-heros'

test('returns super heros that can fly', () => {
  const flyingHeros = getFlyingSuperHeros()

  expect(flyingHeros).toEqual([
    {
      powers: 'fly x',
    },
    {
      powers: 'fly y',
    },
  ])
})
