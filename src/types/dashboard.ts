export interface Kpi {
  ico: string
  label: string
  value: number
  unit: string
  dec: number
  trend: number
}

export interface Trend {
  hours: string[]
  today: number[]
  yest: number[]
}

export interface Category {
  name: string
  value: number
}

export interface Channel {
  name: string
  value: number
}

export interface CityData {
  name: string
  value: number
  coord: [number, number]
}

export interface Rank {
  city: string
  value: number
}

export interface Gauge {
  name: string
  value: number
}

export interface DashboardData {
  kpi: Kpi[]
  trend: Trend
  category: Category[]
  channel: Channel[]
  provinces: Record<string, number>
  cities: CityData[]
  ranking: Rank[]
  gauges: Gauge[]
}
