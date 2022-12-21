<script setup>
import Dialog from './Dialog.vue'
import {ref} from 'vue'
let dialogFormVisible = ref(false)
defineProps({
  siteInfo: {
    type: Object,
    // 默认值
    default: () => ({
      title: 'Vue',
      icon: 'https://api.iowen.cn/favicon/cn.vuejs.org.png',
      url: 'https://cn.vuejs.org/',
      description: '渐进式JavaScript 框架',
    })
  }
})
// 打开链接
function goSite(url) {
  window.open(url)
}
// 修改
function updateInfo() {
  console.log('updateInfo');
  dialogFormVisible.value = false
}
</script>

<template>
  <el-card class="box-card" shadow="hover" @click="goSite(siteInfo.url)">
    <template #header>
      <div class="card-header">
        <h2>{{ siteInfo.title }}</h2>
        <el-button class="button" @click.stop="dialogFormVisible = true">update</el-button>
      </div>
    </template>
    <div class="item">
      <el-image class="icon" :src="siteInfo.icon" fit="fill" />
      <div class="description">{{ siteInfo.description }}</div>
    </div>
  </el-card>

  <Dialog 
  title='Update web bookmarks'
  :dialogFormVisible="dialogFormVisible" 
  :handleConfirm="updateInfo" 
  :siteInfo="siteInfo" />
</template>

<style scoped lang="less">
// less文档: https://less.bootcss.com/

.box-card {
  width: 408px;
  min-width: 400px;
  margin: 10px;
  border-radius: 10px;
  height: 149px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
  }

  .item {
    display: flex;
    @wh: 50px;

    .icon {
      width: @wh;
      height: @wh;
    }

    .description {
      font-size: 12px;
      margin-left: 10px;
      width: 318px;
    }
  }
}

</style>
