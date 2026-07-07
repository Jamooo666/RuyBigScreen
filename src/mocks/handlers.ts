import { http, HttpResponse } from 'msw'
import { dashboardData } from './data'
import { ri } from './data'

// 模拟「实时」返回：每次取值都带轻微扰动，模拟数据源更新
export const dashboardHandlers = [
  http.get('/api/dashboard', () => {
    const d = structuredClone(dashboardData)
    d.kpi.forEach((k) => {
      k.value = Math.max(0, Math.round(k.value * (1 + (Math.random() * 0.025 - 0.01))))
    })
    d.trend.today = d.trend.today.map(() => ri(200, 900))
    d.category.forEach((c) => (c.value = Math.max(5, c.value + ri(-2, 3))))
    return HttpResponse.json(d)
  }),
]
