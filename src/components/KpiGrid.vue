<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/dashboard'
import KpiCard from './KpiCard.vue'

const store = useDashboardStore()
const { kpi } = storeToRefs(store)
</script>

<template>
  <div class="kpi-grid">
    <KpiCard v-for="(k, i) in kpi" :key="i" :kpi="k" />
  </div>
</template>

<style scoped>
.kpi-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  height: 100%;
}
</style>
