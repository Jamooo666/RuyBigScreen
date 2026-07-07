<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import { useDashboardStore } from '@/stores/dashboard'
import BaseChart from './BaseChart.vue'
import type { EChartsOption } from 'echarts'

const store = useDashboardStore()
const { channel } = storeToRefs(store)

const option = computed<EChartsOption>(() => ({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  grid: { left: 70, right: 30, top: 16, bottom: 10 },
  xAxis: {
    type: 'value',
    axisLabel: { color: '#9fc7e8' },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,.06)' } },
  },
  yAxis: {
    type: 'category',
    data: channel.value.map((c) => c.name),
    axisLine: { lineStyle: { color: '#3b5a82' } },
    axisLabel: { color: '#cfe8ff' },
  },
  series: [
    {
      type: 'bar',
      data: channel.value.map((c) => c.value),
      barWidth: 14,
      label: { show: true, position: 'right', color: '#cfe8ff', formatter: '{c}%' },
      itemStyle: {
        borderRadius: 7,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#3b82f6' },
          { offset: 1, color: '#22d3ee' },
        ]),
      },
    },
  ],
}))
</script>

<template>
  <BaseChart :option="option" />
</template>
