import { describe, expect, it } from 'vitest'
import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('formats a value as Vietnamese dong', () => {
    expect(formatCurrency(2490000)).toMatch(/2\.490\.000/)
  })
})
