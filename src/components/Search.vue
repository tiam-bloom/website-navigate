<template>
    <div class="search">
        <!-- @input="search" 值改变触发 -->
        <!-- @change="search" 失去焦点或回车触发 -->
        <el-input 
        class="search-input" 
        @keyup.enter.native="handleOrder" 
        size="large" 
        placeholder="请输入你想搜索的网站信息"     
        v-model="keywords" 
        :prefix-icon="Search" 
        clearable 
        autofocus />
        
        <Dialog 
        ref="dialog"
        title='Add new web bookmarks'
        :dialogFormVisible="dialogFormVisible" 
        :handleConfirm="addSiteInfo" 
        :siteInfo="siteInfo" />
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useSiteStore } from '@/stores/siteInfo'
import { ElMessage } from 'element-plus'
import Dialog from './Dialog.vue'

const siteStore = useSiteStore()
// 获取响应式的state
const { siteInfoList, keywords } = storeToRefs(siteStore)
// 获取action
const { setSiteInfo } = siteStore
function handleOrder() {
    if (!keywords.value.startsWith('/')) {
        return;
    }
    const order = keywords.value.substring(1);
    console.log('获取指令', order);
    // todo 响应指令
    dialogFormVisible.value = true;
}
let dialogFormVisible = ref(false);
// const dialog = ref(null);
// let dialogFormVisible;
// onMounted(() => {
//     console.log(dialog);
//     dialogFormVisible = dialog.value.dialogFormVisible;
// })
// 收集表单数据
const siteInfo = reactive({
    title: 'github',
    icon: 'https://github.com/favicon.ico',
    url: 'https://www.github.com',
    description: '代码仓库',
    category: 'dev-tools',
})

const addSiteInfo = () => {
    if (!siteInfo.title || !siteInfo.url) {
        ElMessage.error('网站名称和网站地址不能为空')
        return
    }
    // 添加数据   
    console.log(siteInfoList.value);
    siteInfoList.value.unshift(setSiteInfo(siteInfo));
    // 清空表单
    siteInfo.title = ''
    siteInfo.url = ''
    siteInfo.description = ''
    siteInfo.category = ''
    // 关闭弹窗
    dialogFormVisible.value = false
    ElMessage.success('添加成功');
}

</script>

<style lang="less" scoped>
.search {
    display: flex;
    /* 水平居中(子元素) */
    justify-content: center;
    /* 垂直居中 */
    align-items: center;
}

.search-input {
    width: 600px;
    margin: 50px;
}


</style>