<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, shallowRef } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const props = defineProps<{ option: EChartsOption }>()
const el = ref<HTMLElement | null>(null)
const chart = shallowRef<echarts.ECharts | null>(null)
let ro: ResizeObserver | null = null

function render() {
  if (!el.value) return
  if (!chart.value) chart.value = echarts.init(el.value)
  chart.value.setOption(props.option, true)
}

onMounted(() => {
  render()
  if (el.value) {
    ro = new ResizeObserver(() => chart.value?.resize())
    ro.observe(el.value)
  }
})
watch(() => props.option, render, { deep: true })
onBeforeUnmount(() => {
  ro?.disconnect()
  chart.value?.dispose()
})
</script>

<template>
  <div ref="el" class="base-chart"></div>
</template>

<style scoped>
.base-chart {
  width: 100%;
  height: 100%;
}
</style>
