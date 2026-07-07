<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import { useDashboardStore } from '@/stores/dashboard'
import BaseChart from './BaseChart.vue'
import type { EChartsOption } from 'echarts'

const store = useDashboardStore()
const { trend } = storeToRefs(store)

const option = computed<EChartsOption>(() => ({
  tooltip: { trigger: 'axis' },
  legend: { data: ['今日', '昨日'], textStyle: { color: '#9fc7e8' }, top: 0, right: 10 },
  grid: { left: 40, right: 16, top: 36, bottom: 24 },
  xAxis: {
    type: 'category',
    data: trend.value.hours,
    axisLine: { lineStyle: { color: '#3b5a82' } },
    axisLabel: { color: '#9fc7e8', interval: 3 },
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(255,255,255,.06)' } },
    axisLabel: { color: '#9fc7e8' },
  },
  series: [
    {
      name: '今日',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: trend.value.today,
      lineStyle: { color: '#22d3ee', width: 2 },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(34,211,238,.45)' },
          { offset: 1, color: 'rgba(34,211,238,0)' },
        ]),
      },
    },
    {
      name: '昨日',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: trend.value.yest,
      lineStyle: { color: '#a78bfa', width: 2 },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(167,139,250,.3)' },
          { offset: 1, color: 'rgba(167,139,250,0)' },
        ]),
      },
    },
  ],
}))
</script>

<template>
  <BaseChart :option="option" />
</template>
