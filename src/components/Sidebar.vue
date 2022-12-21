<template>
    <div class="sidebar">
        <ul class="infinite-list">
            <li class="infinite-list-item"><router-link active-class="active" to="/index">首页</router-link></li>
            <li class="infinite-list-item" v-for="item in categories">
                <router-link active-class="active" :to="{ name: item }">{{ transname(item) }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useSiteStore } from '@/stores/siteInfo'
import { storeToRefs } from "pinia";
const siteStore = useSiteStore()
const { categories } = storeToRefs(siteStore)

const transname = (name) => {
    switch (name) {
        case 'dev-tools':
            return '开发工具'
        case 'study':
            return '学习导航'
        default:
            return name
    }
}
</script>

<style lang="less" scoped>
a {
    // 去除下划线
    text-decoration: none;
    color: black;
}

.active {
    background: var(--el-color-primary-light-8);
    color: var(--el-color-primary);
    // 加粗
    font-weight: bold;
    // 文字阴影
    text-shadow: 1px 1px gray;
}

.sidebar {
    // 防止被挤压变小
    // flex-shrink: 0;
    width: 200px;
    // 最小宽度 4个字符
    min-width: 4em;
    // 否则高度不会自适应
    height: 100%;
    margin: 10px;
    border-radius: 10px;
    background: var(--el-color-primary-light-9);
}

.infinite-list {
    padding: 0;
    margin: 0;
    list-style: none;

    .infinite-list-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;

        color: var(--el-color-primary-dark);

        &:hover {
            background: var(--el-color-primary-light-8);
            color: var(--el-color-primary);
            // cursor: pointer;
        }
    }
}
</style>