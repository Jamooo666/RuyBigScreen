<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { EChartsOption } from 'echarts'
import { useDashboardStore } from '@/stores/dashboard'
import BaseChart from './BaseChart.vue'

const store = useDashboardStore()
const { gauges } = storeToRefs(store)

const colors = ['#22d3ee', '#34d399']

function gaugeOption(name: string, value: number, color: string): EChartsOption {
  return {
    series: [
      {
        type: 'gauge',
        radius: '92%',
        center: ['50%', '58%'],
        startAngle: 210,
        endAngle: -30,
        min: 0,
        max: 100,
        progress: { show: true, width: 10, itemStyle: { color } },
        axisLine: { lineStyle: { width: 10, color: [[1, 'rgba(255,255,255,.12)']] } },
        axisTick: { show: false },
        splitLine: { length: 8, lineStyle: { color: '#3b5a82' } },
        axisLabel: { color: '#7fb4d8', fontSize: 10, distance: 12 },
        pointer: { width: 4, itemStyle: { color } },
        anchor: { show: true, size: 8, itemStyle: { color } },
        title: { offsetCenter: [0, '32%'], color: '#cfe8ff', fontSize: 13 },
        detail: { valueAnimation: true, color: '#fff', fontSize: 22, offsetCenter: [0, '0%'], formatter: '{value}%' },
        data: [{ value, name }],
      },
    ],
  }
}

const g1 = computed(() => gaugeOption(gauges.value[0]?.name ?? '', gauges.value[0]?.value ?? 0, colors[0]))
const g2 = computed(() => gaugeOption(gauges.value[1]?.name ?? '', gauges.value[1]?.value ?? 0, colors[1]))
</script>

<template>
  <div class="gauge-b">
    <BaseChart :option="g1" />
    <BaseChart :option="g2" />
  </div>
</template>

<style scoped>
.gauge-b {
  display: flex;
  width: 100%;
  height: 100%;
}
.gauge-b > * {
  width: 50%;
  height: 100%;
}
</style>
