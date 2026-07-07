<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <section class="panel">
    <header class="panel-h"><i class="bar"></i>{{ title }}</header>
    <div class="panel-b"><slot /></div>
  </section>
</template>

<style scoped>
.panel {
  position: relative;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  background: var(--panel-bg);
  border: 1px solid var(--panel-bd);
  box-shadow: inset 0 0 24px rgba(34, 211, 238, 0.06), 0 0 14px rgba(34, 211, 238, 0.1);
  backdrop-filter: blur(2px);
}
.panel.grow {
  flex: 1 1 auto;
}
.panel.short {
  flex: 0 0 196px;
}
.panel::before,
.panel::after {
  content: '';
  position: absolute;
  width: 14px;
  height: 14px;
  pointer-events: none;
}
.panel::before {
  top: -1px;
  left: -1px;
  border-top: 2px solid var(--cyan);
  border-left: 2px solid var(--cyan);
}
.panel::after {
  bottom: -1px;
  right: -1px;
  border-bottom: 2px solid var(--cyan);
  border-right: 2px solid var(--cyan);
}
.panel-h {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 14px;
  font-size: 18px;
  font-weight: 700;
  color: #e6f6ff;
  border-bottom: 1px solid rgba(34, 211, 238, 0.18);
  background: linear-gradient(90deg, rgba(34, 211, 238, 0.14), transparent);
}
.panel-h .bar {
  width: 4px;
  height: 16px;
  background: var(--cyan);
  box-shadow: 0 0 8px var(--cyan);
}
.panel-b {
  position: relative;
  flex: 1 1 auto;
  padding: 10px 12px;
  overflow: hidden;
}
</style>
