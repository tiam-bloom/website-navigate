<template>
  <div class="search">
    <!-- @input="search" 值改变触发 -->
    <!-- @change="search" 失去焦点或回车触发 -->
    <el-autocomplete highlight-first-item style="width:600px;margin:50px" :fetch-suggestions="querySearch"
      :trigger-on-focus="false" class="search-input" @keyup.enter.native="handleOrder" size="large"
      placeholder="请输入你想搜索的网站信息" v-model="keywords" :prefix-icon="Search" clearable autofocus />

    <Dialog ref="dialogVisible" title='Add new web bookmarks' :handleConfirm="addSiteInfo" :siteInfo="siteInfo" />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useSiteStore } from '@/stores/siteInfo'
import { ElMessage } from 'element-plus'
import Dialog from './Dialog.vue'
import axios from 'axios'
import setSiteInfo from '@/hooks/useSetSiteInfo.js'

const siteStore = useSiteStore();
// 获取响应式的state
const { keywords } = storeToRefs(siteStore);

const dialogVisible = ref(false);

//获取子组件的data数据
// const a = dialogVisible.value.getData()

function handleOrder() {
  if (!keywords.value.startsWith('/')) return;
  const order = keywords.value.substring(1);
  console.log('获取指令', order);
  // todo 响应指令
  switch (order) {
    case 'add':
      //给子组件传递数据
      dialogVisible.value.setData(true)
      break;
    default:
      ElMessage.info('指令新增中...')
      break;
  }
}
// 收集表单数据
const siteInfo = reactive({
  title: '',
  icon: '',
  url: '',
  description: '',
  category: '默认分类',
})

const addSiteInfo = async () => {
  if (!siteInfo.url || !siteInfo.category) {
    ElMessage.error('网站地址或分类不能为空')
    return
  }
  // 先响应提示, 后台等待发送请求, 避免响应过长
  dialogVisible.value.setData(false)
  ElMessage.info('添加中...');
  // 加工补充用户的信息
  let site = await setSiteInfo(siteInfo);
  console.log(site);
  // siteInfoList.value.unshift(s);
  axios.post('http://localhost:3000', site, {
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => {
    console.log(res.data);
    // 清空表单
    siteInfo.title = ''
    siteInfo.url = ''
    siteInfo.description = ''
    siteInfo.category = ''
    ElMessage.success('添加成功');
  }).catch(err => {
    console.log(err);
    ElMessage.error('添加失败, 请重试');
  })
}

const orders = ref([])
// 命令提示
const querySearch = (queryString, cb) => {
  const results = queryString
    ? orders.value.filter(createFilter(queryString))
    : orders.value
  cb(results)
}
const createFilter = (queryString) => {
  return (orders) => {
    return (
      orders.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const loadAll = () => {
  return [
    { value: '/add' },
    { value: '/delete' },
    { value: '/update' },
  ]
}
onMounted(() => {
  orders.value = loadAll()
})
</script>

<style lang="less" scoped>
.search {
  display: flex;
  /* 水平居中(子元素) */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
}
</style>