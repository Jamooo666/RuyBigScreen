<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const weekMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
const date = ref('')
const clock = ref('')
const refresh = ref('')

function pad(n: number) {
  return String(n).padStart(2, '0')
}
function tick() {
  const d = new Date()
  date.value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${weekMap[d.getDay()]}`
  clock.value = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  refresh.value = '刷新 ' + clock.value
}

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="h-inner">
    <div class="h-left">
      <div class="h-date">{{ date }}</div>
      <div class="h-clock">{{ clock }}</div>
    </div>
    <div class="h-center">
      <h1 class="h-title">如意数据大屏</h1>
      <div class="h-sub">RuyiBigScreen · Real-time Data View</div>
      <div class="h-line"></div>
    </div>
    <div class="h-right">
      <span class="badge ok">● 系统在线</span>
      <span class="badge">☀ 晴 26°C</span>
      <span class="badge">{{ refresh }}</span>
    </div>
  </div>
</template>

<style scoped>
.h-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.h-left { width: 360px; }
.h-date { font-size: 16px; color: #9fc7e8; letter-spacing: 1px; }
.h-clock {
  font-size: 30px;
  font-weight: 700;
  color: var(--cyan);
  font-family: 'Consolas', 'DIN', monospace;
  letter-spacing: 2px;
  text-shadow: 0 0 12px rgba(34, 211, 238, 0.6);
}
.h-center { text-align: center; }
.h-title {
  font-size: 38px;
  font-weight: 800;
  letter-spacing: 8px;
  background: linear-gradient(90deg, #67e8f9, #fff, #67e8f9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 24px rgba(34, 211, 238, 0.5);
}
.h-sub { font-size: 13px; color: #7fb4d8; letter-spacing: 3px; margin-top: 2px; }
.h-line {
  width: 460px;
  height: 2px;
  margin: 6px auto 0;
  background: linear-gradient(90deg, transparent, var(--cyan), transparent);
}
.h-right { width: 360px; display: flex; gap: 10px; justify-content: flex-end; }
.badge {
  font-size: 13px;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid rgba(34, 211, 238, 0.3);
  background: rgba(34, 211, 238, 0.06);
  color: #bfe6ff;
  white-space: nowrap;
}
.badge.ok { color: var(--green); border-color: rgba(52, 211, 153, 0.4); }
</style>
