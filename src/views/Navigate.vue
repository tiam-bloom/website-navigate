<template>
  <div class="navigate">
    <SiteCard v-for="item in _siteInfoList" :siteInfo="item" />
  </div>
</template>

<script setup>
import SiteCard from '@/components/SiteCard.vue'
import { storeToRefs } from 'pinia'
import { useSiteStore } from '@/stores/siteInfo'
const siteStore = useSiteStore()

// 获取响应式的state
const { _siteInfoList } = storeToRefs(siteStore)

</script>

<style lang="less" scoped>
.navigate {
  display: flex;
  flex-wrap: wrap;
  width: 100% // justify-content: space-between
}
</style>