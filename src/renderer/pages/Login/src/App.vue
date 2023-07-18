<script setup>
import { ref, reactive } from 'vue'
import { theme } from 'ant-design-vue'
const { useToken, defaultAlgorithm, darkAlgorithm } = theme
const { token } = useToken()
const algorithm = ref(defaultAlgorithm)
const login = async () => {
  algorithm.value = algorithm.value == darkAlgorithm ? defaultAlgorithm : darkAlgorithm
  // window.api.openWindow('mainwin')
}
</script>

<template>
  <a-config-provider
    :theme="{
      algorithm: algorithm,
      token: { colorPrimary: '#00b96b' }
    }"
  >
    <a-layout class="wrapper">
      <a-layout-header>Header</a-layout-header>
      <a-layout-content class="wrapper-content flex-sub">
        <a-button type="primary" block @click="login">login</a-button>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-config-provider>
</template>

<style lang="less">
.wrapper {
  height: 100vh;
  &-content {
    padding: 10px;
  }
}
</style>
