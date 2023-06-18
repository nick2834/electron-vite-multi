<script setup>
// import { ref, reactive } from 'vue'
const login = async () => {
  window.api.openWindow('mainwin')
}
</script>

<template>
  <a-layout class="wrapper">
    <a-layout-header>Header</a-layout-header>
    <a-layout-content class="wrapper-content flex-sub">
      <a-button type="primary" block @click="login">login</a-button>
    </a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<style lang="less">
.wrapper {
  height: 100vh;
  &-content {
    padding: 10px;
  }
}
</style>
