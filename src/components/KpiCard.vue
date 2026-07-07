<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Kpi } from '@/types/dashboard'
import { formatNumber } from '@/utils/format'

const props = defineProps<{ kpi: Kpi }>()
const display = ref(0)

function animateTo(target: number) {
  const start = display.value
  const t0 = performance.now()
  const dur = 800
  function step(now: number) {
    const p = Math.min((now - t0) / dur, 1)
    const e = 1 - Math.pow(1 - p, 3)
    display.value = start + (target - start) * e
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => animateTo(props.kpi.value))
watch(
  () => props.kpi.value,
  (v) => animateTo(v),
)
</script>

<template>
  <div class="kpi">
    <div class="ico">{{ kpi.ico }}</div>
    <div class="label">{{ kpi.label }}</div>
    <div class="val">
      {{ formatNumber(display, kpi.dec) }}<span class="unit">{{ kpi.unit }}</span>
    </div>
    <div class="trend" :class="kpi.trend >= 0 ? 'up' : 'down'">
      {{ kpi.trend >= 0 ? '▲' : '▼' }} {{ Math.abs(kpi.trend) }}%
    </div>
  </div>
</template>

<style scoped>
.kpi {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px 12px;
  border: 1px solid rgba(34, 211, 238, 0.2);
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.08), rgba(59, 130, 246, 0.04));
}
.ico { font-size: 14px; color: var(--cyan); }
.label { font-size: 13px; color: #9fc7e8; margin: 2px 0; }
.val {
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  font-family: 'Consolas', monospace;
}
.unit { font-size: 13px; color: #9fc7e8; margin-left: 4px; font-weight: 400; }
.trend { font-size: 12px; margin-top: 2px; }
.trend.up { color: var(--green); }
.trend.down { color: #f87171; }
</style>
