<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, shallowRef } from 'vue'
import * as echarts from 'echarts'
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/dashboard'

const store = useDashboardStore()
const { provinces, cities } = storeToRefs(store)

const el = ref<HTMLElement | null>(null)
const chart = shallowRef<echarts.ECharts | null>(null)
let ro: ResizeObserver | null = null

function buildOption() {
  const bj: [number, number] = [116.4, 39.9]
  const lines = cities.value
    .filter((c) => c.name !== '北京')
    .map((c) => ({ coords: [bj, c.coord] }))
  const provData = Object.entries(provinces.value).map(([name, value]) => ({ name, value }))
  return {
    tooltip: {
      trigger: 'item',
      formatter: (p: any) => `${p.name}：${provinces.value[p.name] ?? p.value ?? '-'}`,
    },
    visualMap: {
      min: 100,
      max: 1000,
      left: 16,
      bottom: 16,
      calculable: true,
      textStyle: { color: '#9fc7e8' },
      inRange: { color: ['#0b2a5b', '#1565c0', '#22d3ee'] },
    },
    geo: {
      map: 'china',
      roam: false,
      label: { show: false },
      itemStyle: { areaColor: 'rgba(13,31,71,.6)', borderColor: 'rgba(34,211,238,.4)' },
      emphasis: { itemStyle: { areaColor: 'rgba(34,211,238,.25)' }, label: { color: '#fff' } },
    },
    series: [
      { name: '销量', type: 'map', geoIndex: 0, data: provData },
      {
        name: '飞线',
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 2,
        effect: { show: true, period: 5, trailLength: 0.4, color: '#fbbf24', symbol: 'arrow', symbolSize: 6 },
        lineStyle: { color: '#fbbf24', width: 1, opacity: 0.6, curveness: 0.3 },
        data: lines,
      },
      {
        name: '城市',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 3,
        rippleEffect: { brushType: 'stroke', scale: 4 },
        symbolSize: (v: any) => 6 + v[2] / 90,
        itemStyle: { color: '#34d399' },
        data: cities.value.map((c) => ({ name: c.name, value: c.coord.concat(c.value) })),
      },
    ],
  }
}

onMounted(async () => {
  if (!el.value) return
  chart.value = echarts.init(el.value)
  ro = new ResizeObserver(() => chart.value?.resize())
  ro.observe(el.value)

  chart.value.showLoading({ text: '地图加载中...', textColor: '#22d3ee', maskColor: 'rgba(6,13,42,.6)' })
  try {
    const res = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const geo = await res.json()
    echarts.registerMap('china', geo)
    chart.value.hideLoading()
    chart.value.setOption(buildOption())
  } catch {
    chart.value.hideLoading()
    if (el.value) el.value.innerHTML = '<div class="fallback">地图资源加载失败（网络受限），其余模块正常运行</div>'
  }
})

watch([provinces, cities], () => {
  if (chart.value) chart.value.setOption(buildOption())
}, { deep: true })

onBeforeUnmount(() => {
  ro?.disconnect()
  chart.value?.dispose()
})
</script>

<template>
  <div ref="el" class="map-chart"></div>
</template>

<style scoped>
.map-chart {
  width: 100%;
  height: 100%;
}
.fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #f87171;
  font-size: 14px;
  text-align: center;
}
</style>
