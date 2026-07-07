import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchDashboard } from '@/services/dashboard'
import type {
  Kpi,
  Trend,
  Category,
  Channel,
  CityData,
  Rank,
  Gauge,
} from '@/types/dashboard'
import { log } from '@/logs/logger'

interface ProvinceMap {
  [name: string]: number
}

function ri(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const useDashboardStore = defineStore('dashboard', () => {
  const kpi = ref<Kpi[]>([])
  const trend = ref<Trend>({ hours: [], today: [], yest: [] })
  const category = ref<Category[]>([])
  const channel = ref<Channel[]>([])
  const provinces = ref<ProvinceMap>({})
  const cities = ref<CityData[]>([])
  const ranking = ref<Rank[]>([])
  const gauges = ref<Gauge[]>([])

  let timer: ReturnType<typeof setInterval> | undefined

  function tick() {
    kpi.value = kpi.value.map((k) => {
      const value = Math.max(0, k.value * (1 + (Math.random() * 0.025 - 0.01)))
      const trend = +(k.trend + (Math.random() * 0.8 - 0.4)).toFixed(1)
      return { ...k, value, trend }
    })

    trend.value = {
      ...trend.value,
      today: [...trend.value.today.slice(1), ri(200, 900)],
      yest: [...trend.value.yest.slice(1), ri(180, 820)],
    }

    const sum = category.value.reduce((s, c) => s + Math.max(5, c.value + ri(-2, 3)), 0)
    category.value = category.value.map((c) => ({
      ...c,
      value: +(((Math.max(5, c.value + ri(-2, 3))) / sum) * 100).toFixed(0),
    }))

    channel.value = channel.value.map((c) => ({ ...c, value: Math.max(3, c.value + ri(-2, 3)) }))

    const next: ProvinceMap = {}
    for (const [name, value] of Object.entries(provinces.value)) {
      next[name] = Math.max(100, value + ri(-40, 50))
    }
    provinces.value = next

    cities.value = cities.value.map((c) => ({ ...c, value: Math.max(100, c.value + ri(-30, 40)) }))
    ranking.value = ranking.value.map((r) => ({ ...r, value: Math.max(100, r.value + ri(-30, 40)) }))
    gauges.value = gauges.value.map((g) => ({
      ...g,
      value: Math.min(98, Math.max(20, g.value + (g.name.includes('转化') ? ri(-4, 4) : ri(-6, 6)))),
    }))
  }

  async function start() {
    const d = await fetchDashboard()
    kpi.value = d.kpi
    trend.value = d.trend
    category.value = d.category
    channel.value = d.channel
    provinces.value = d.provinces
    cities.value = d.cities
    ranking.value = d.ranking
    gauges.value = d.gauges
    if (timer) clearInterval(timer)
    timer = setInterval(tick, 3000)
    log.info('实时数据已启动')
  }

  function stop() {
    if (timer) clearInterval(timer)
  }

  return {
    kpi,
    trend,
    category,
    channel,
    provinces,
    cities,
    ranking,
    gauges,
    start,
    stop,
  }
})
