<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const store = useDashboardStore()
const rows = ref<{ city: string; value: number; pct: number }[]>([])

function render() {
  const max = Math.max(...store.ranking.map((r) => r.value), 1)
  rows.value = [...store.ranking]
    .sort((a, b) => b.value - a.value)
    .map((r) => ({ city: r.city, value: r.value, pct: (r.value / max) * 100 }))
}

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  render()
  timer = setInterval(render, 4000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="rank-scroll">
    <div class="rank-track">
      <div v-for="(r, i) in rows" :key="i" class="rank-row">
        <div class="no" :class="{ top: i < 3 }">{{ i + 1 }}</div>
        <div class="city">{{ r.city }}</div>
        <div class="meter"><i :style="{ width: r.pct + '%' }"></i></div>
        <div class="num">{{ r.value }}</div>
      </div>
      <div v-for="(r, i) in rows" :key="'c' + i" class="rank-row" aria-hidden="true">
        <div class="no" :class="{ top: i < 3 }">{{ i + 1 }}</div>
        <div class="city">{{ r.city }}</div>
        <div class="meter"><i :style="{ width: r.pct + '%' }"></i></div>
        <div class="num">{{ r.value }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rank-scroll { height: 100%; overflow: hidden; }
.rank-track { animation: scrollUp 22s linear infinite; }
.rank-track:hover { animation-play-state: paused; }
@keyframes scrollUp {
  from { transform: translateY(0); }
  to { transform: translateY(-50%); }
}
.rank-row { display: flex; align-items: center; gap: 10px; padding: 7px 4px; }
.no {
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  font-size: 13px;
  border-radius: 4px;
  background: rgba(34, 211, 238, 0.15);
  color: var(--cyan);
  font-weight: 700;
}
.no.top { background: var(--orange); color: #1a1a1a; }
.city { width: 64px; font-size: 14px; color: #dbeeff; }
.meter {
  flex: 1;
  height: 12px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  overflow: hidden;
}
.meter i {
  display: block;
  height: 100%;
  border-radius: 6px;
  background: linear-gradient(90deg, var(--blue), var(--cyan));
  transition: width 0.8s ease;
}
.num { width: 64px; text-align: right; font-size: 14px; font-family: 'Consolas', monospace; color: #fff; }
</style>
