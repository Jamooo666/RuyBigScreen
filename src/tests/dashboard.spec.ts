import { describe, it, expect } from 'vitest'
import { formatNumber } from '@/utils/format'
import { dashboardData } from '@/mocks/data'

describe('utils/format', () => {
  it('formats integers with thousands separator', () => {
    expect(formatNumber(1284560)).toBe('1,284,560')
  })
  it('formats decimals when dec > 0', () => {
    expect(formatNumber(42.8, 1)).toBe('42.8')
  })
})

describe('mocks/data', () => {
  it('exposes all dashboard sections', () => {
    expect(dashboardData.kpi).toHaveLength(4)
    expect(dashboardData.cities.length).toBeGreaterThan(0)
    expect(Object.keys(dashboardData.provinces).length).toBeGreaterThan(30)
    expect(dashboardData.category.reduce((s, c) => s + c.value, 0)).toBeGreaterThan(0)
  })
})
