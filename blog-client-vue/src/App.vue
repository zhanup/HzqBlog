<template>
  <Header :isTransparent="isTransparent" />
  <main class="page-content">
    <router-view></router-view>
  </main>
  <Footer />
  <el-backtop class="backTop" :right="20" :bottom="20" />
</template>

<script setup lang="ts">
import useIsTransparent from './hooks/useIsTransparent'
import Header from './components/header/Header.vue'
import Footer from './components/footer/Footer.vue'

// 导航背景透明
const isTransparent = useIsTransparent()
</script>

<style lang="less">
@import url('./assets/css/base.css');
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.backTop {
  background-color: var(--board-bg-color) !important;
  color: var(--text-color) !important;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%),
    0 1px 5px 0 rgb(0 0 0 / 20%) !important;
}

.page-content {
  flex: 1;
  background-color: var(--body-bg-color);
  transition: background 0.5s ease-in-out;
}
</style>
