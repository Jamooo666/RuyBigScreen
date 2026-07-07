<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const store = useDashboardStore()
const users = ['小明', 'Lee', '阿强', 'Anna', '老王', 'Tom', '丽丽', 'Kevin', '静静', '阿杰']
const acts = ['完成下单', '注册成功', '领取优惠券', '分享大屏', '支付成功', '加入会员']
const logs = ref<{ t: string; u: string; c: string; a: string }[]>([])

function pad(n: number) {
  return String(n).padStart(2, '0')
}
function push() {
  const d = new Date()
  const t = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  const u = users[Math.floor(Math.random() * users.length)]
  const a = acts[Math.floor(Math.random() * acts.length)]
  const c = store.cities[Math.floor(Math.random() * store.cities.length)].name
  logs.value.unshift({ t, u, c, a })
  if (logs.value.length > 9) logs.value.pop()
}

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  for (let i = 0; i < 6; i++) push()
  timer = setInterval(push, 2000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="log-list">
    <div v-for="(l, i) in logs" :key="i" class="log-item">
      <span class="t">{{ l.t }}</span>用户 <span class="u">{{ l.u }}</span> 在 <b>{{ l.c }}</b> {{ l.a }}
    </div>
  </div>
</template>

<style scoped>
.log-list {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.log-item {
  font-size: 13px;
  color: #cfe8ff;
  padding: 6px 8px;
  line-height: 1.4;
  border-left: 2px solid var(--green);
  background: rgba(52, 211, 153, 0.06);
  animation: fadeIn 0.5s ease;
}
.t { color: #7fb4d8; margin-right: 6px; font-family: 'Consolas', monospace; }
.u { color: var(--cyan); }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: none; }
}
</style>
