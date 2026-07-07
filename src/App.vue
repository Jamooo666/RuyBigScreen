<script setup lang="ts">
import ScreenLayout from '@/layouts/ScreenLayout.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import PanelBox from '@/components/PanelBox.vue'
import KpiGrid from '@/components/KpiGrid.vue'
import RankingList from '@/components/RankingList.vue'
import LogFeed from '@/components/LogFeed.vue'
import TrendChart from '@/charts/TrendChart.vue'
import CategoryChart from '@/charts/CategoryChart.vue'
import ChannelChart from '@/charts/ChannelChart.vue'
import GaugeGroup from '@/charts/GaugeGroup.vue'
import MapChart from '@/charts/MapChart.vue'
</script>

<template>
  <ScreenLayout>
    <template #header>
      <HeaderBar />
    </template>

    <template #left>
      <PanelBox title="核心指标" short><KpiGrid /></PanelBox>
      <PanelBox title="实时销量趋势" grow><TrendChart /></PanelBox>
      <PanelBox title="品类销售占比" grow><CategoryChart /></PanelBox>
    </template>

    <template #center>
      <PanelBox title="全国销售分布" grow><MapChart /></PanelBox>
      <PanelBox title="城市销量排行榜 TOP10"><RankingList /></PanelBox>
    </template>

    <template #right>
      <PanelBox title="渠道分布"><ChannelChart /></PanelBox>
      <PanelBox title="设备与转化"><GaugeGroup /></PanelBox>
      <PanelBox title="实时动态"><LogFeed /></PanelBox>
    </template>
  </ScreenLayout>
</template>
