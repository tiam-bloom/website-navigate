<script setup>
import Search from '@/components/Search.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <Search />
  <div class="container">
    <Sidebar />
    <router-view />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding:0 20px 50px;
  display: flex;
}
</style>
