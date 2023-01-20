<template>
  <div class="navigate">
    <SiteCard v-for="item in _siteInfoList" :siteInfo="item" />
    <!-- 返回顶部 -->
    <el-backtop :bottom="100">
      <div style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      ">
        UP
      </div>
    </el-backtop>
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
  width: 100%; // justify-content: space-between
  // 解决某些情况下, 每一行间距不一致的情况
  align-content: flex-start;
}
</style>