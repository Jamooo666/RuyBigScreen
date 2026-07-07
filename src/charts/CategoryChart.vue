<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/dashboard'
import BaseChart from './BaseChart.vue'
import type { EChartsOption } from 'echarts'

const store = useDashboardStore()
const { category } = storeToRefs(store)

const palette = ['#22d3ee', '#3b82f6', '#34d399', '#fbbf24', '#a78bfa']

const option = computed<EChartsOption>(() => ({
  color: palette,
  tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
  legend: { bottom: 0, textStyle: { color: '#9fc7e8' } },
  series: [
    {
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      itemStyle: { borderColor: '#0a1a44', borderWidth: 2 },
      label: { color: '#cfe8ff', formatter: '{b}\n{c}%' },
      data: category.value,
    },
  ],
}))
</script>

<template>
  <BaseChart :option="option" />
</template>
