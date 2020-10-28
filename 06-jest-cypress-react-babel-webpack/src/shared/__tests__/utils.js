import {getFormattedValue} from '../utils'

test('formats the value', () => {
  expect(getFormattedValue('1234.00')).toBe('1,234.00')
})
