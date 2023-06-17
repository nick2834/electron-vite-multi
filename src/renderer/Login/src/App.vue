<script setup>
import { provide } from 'vue'
// import { ipc } from '@utils/electron'
const login = async () => {
  window.api.openMainWindow()
}
</script>

<template>
  <div class="wrapper">
    <button @click="login">登录</button>
  </div>
</template>

<style lang="less">
.wrapper {
  padding: 20px;
}
</style>
