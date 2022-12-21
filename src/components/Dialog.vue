<template>
    <el-dialog :model-value="dialogFormVisible" :title="title" append-to-body>
        <el-form :model="siteInfo">
            <el-form-item label="网站标题">
                <el-input v-model="siteInfo.title" autocomplete="on" maxlength="15" autofocus clearable />
            </el-form-item>
            <el-form-item label="网站地址">
                <el-input type="url" v-model="siteInfo.url" autocomplete="url" clearable />
            </el-form-item>
            <el-form-item label="网站类别">
                <el-select v-model="siteInfo.category" placeholder="Please select a category">
                    <el-option label="开发工具" value="dev-tools" />
                    <el-option label="学习导航" value="study" />
                </el-select>
            </el-form-item>
            <el-form-item label="网站描述">
                <el-input v-model="siteInfo.description" type="textarea" placeholder="Please input description" autosize
                    :show-word-limit="true" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button @click="handleConfirm" type="primary">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
// let dialogFormVisible = ref(false)
// defineExpose({
//     dialogFormVisible,
// })
defineProps({
    title: {
        type: String,
        default: '',
    },
    dialogFormVisible: {
        type: Boolean,
        default: false,
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