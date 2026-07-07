<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { fitScreen } from '@/utils/scale'

const screen = ref<HTMLElement | null>(null)

function apply() {
  if (screen.value) {
    screen.value.style.transform = `translate(-50%, -50%) scale(${fitScreen()})`
  }
}

onMounted(() => {
  apply()
  window.addEventListener('resize', apply)
})
onBeforeUnmount(() => window.removeEventListener('resize', apply))
</script>

<template>
  <div id="screen" ref="screen">
    <header class="header"><slot name="header" /></header>
    <section class="col col-left"><slot name="left" /></section>
    <section class="col col-center"><slot name="center" /></section>
    <section class="col col-right"><slot name="right" /></section>
  </div>
</template>

<style scoped>
#screen {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1920px;
  height: 1080px;
  transform-origin: center center;
  background:
    radial-gradient(1200px 700px at 50% -10%, rgba(34, 211, 238, 0.1), transparent 60%),
    radial-gradient(900px 600px at 10% 110%, rgba(59, 130, 246, 0.1), transparent 60%),
    radial-gradient(900px 600px at 90% 110%, rgba(167, 139, 250, 0.1), transparent 60%),
    linear-gradient(160deg, #060d2a 0%, #0a1a44 100%);
  overflow: hidden;
}
#screen::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}
.header {
  position: relative;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  border-bottom: 1px solid rgba(34, 211, 238, 0.25);
  background: linear-gradient(180deg, rgba(34, 211, 238, 0.08), transparent);
}
.col {
  position: absolute;
  top: 100px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.col-left { left: 20px; width: 460px; }
.col-center { left: 500px; width: 900px; }
.col-right { left: 1420px; width: 480px; }
</style>
