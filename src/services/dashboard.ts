import { dashboardData } from '@/mocks/data'
import type { DashboardData } from '@/types/dashboard'
import { log } from '@/logs/logger'

// 数据源切换开关：默认走前端 mock；开启 MSW 后走 /api/dashboard
const USE_MSW = import.meta.env.VITE_USE_MSW === 'true'

export async function fetchDashboard(): Promise<DashboardData> {
  if (USE_MSW) {
    log.info('通过 MSW 拉取 /api/dashboard')
    const res = await fetch('/api/dashboard')
    return res.json()
  }
  log.info('使用前端 mock 数据')
  return structuredClone(dashboardData)
}
