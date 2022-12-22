<template>
    <el-dialog v-model="dialogVisible" :title="title" append-to-body>
        <el-form :model="siteInfo">
            <el-form-item label="网站标题">
                <el-input v-model="siteInfo.title" autocomplete="on" maxlength="15" autofocus clearable />
            </el-form-item>
            <el-form-item label="网站地址">
                <el-input type="url" v-model="siteInfo.url" autocomplete="url" clearable />
            </el-form-item>
            <el-form-item label="网站类别">
                <el-select filterable allow-create default-first-option v-model="siteInfo.category" placeholder="Please select a category">
                    <el-option v-for="item in categories" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="网站描述">
                <el-input v-model="siteInfo.description" type="textarea" placeholder="Please input description" autosize
                    :show-word-limit="true" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button @click="handleConfirm" type="primary">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSiteStore } from '@/stores/siteInfo'
const siteStore = useSiteStore()
// 获取响应式的state
const { categories } = storeToRefs(siteStore)

const dialogVisible = ref(false)

// 暴露出去父组件可以拿到 dialogVisible的数据
defineExpose({
    //父组件修改值
    setData(val) {
        dialogVisible.value = val
    },
    // 父组件读取值
    getData() {
        return dialogVisible.value
    }
})
// 只读属性
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    handleConfirm: {
        type: Function,
        default: () => { },
    },
    siteInfo: {
        type: Object,
        default: () => { },
    },
})

</script>

<style lang='less' scoped>
// 表单
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 800px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>