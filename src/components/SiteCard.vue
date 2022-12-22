<script setup>
import { ref } from 'vue'
import Dialog from './Dialog.vue'

const props = defineProps({
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

const dialogVisible = ref(null)
// 打开链接
function goSite(url) {
  window.open(url)
}
// 修改
function updateInfo() {
  console.log('updateInfo');
  console.log(props.siteInfo);
  dialogVisible.value.setData(false)
}
</script>

<template>
  <el-card class="box-card" shadow="hover" @click="goSite(siteInfo.url)">
    <template #header>
      <div class="card-header">
        <h2>{{ siteInfo.title }}</h2>
        <el-button class="button" @click.stop="dialogVisible.setData(true)">update</el-button>
      </div>
    </template>
    <div class="item">
      <el-image class="icon" :src="siteInfo.icon" fit="fill" />
      <div class="description">{{ siteInfo.description }}</div>
    </div>
  </el-card>

  <Dialog ref="dialogVisible" title='Update web bookmarks' :handleConfirm="updateInfo" :siteInfo="siteInfo" />
</template>

<style scoped lang="less">
// less文档: https://less.bootcss.com/
.card-header>h2 {
  // 不换行
  white-space: nowrap;
  // 超出部分显示省略号
  text-overflow: ellipsis;
  // 超出部分隐藏
  overflow: hidden;
}

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
