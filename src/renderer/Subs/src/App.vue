<template>
  <a-layout class="wrapper">
    <a-layout-header>Header</a-layout-header>
    <a-layout-content class="wrapper-content flex-sub">
      <a-button type="primari" @click="changeTheme">change theme</a-button>
    </a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { useTheme } from '../../hooks/useTheme'
const isDark = useStorage('theme')
const { DarkMode } = useTheme()
const theme = ref(false)
watch(
  () => isDark,
  (val) => {
    // String to Boolean
    let darkMode = JSON.parse(val.value)
    theme.value = darkMode
    DarkMode(darkMode)
  },
  { immediate: true, deep: true }
)
const changeTheme = () => {
  theme.value = !theme.value
  DarkMode(theme.value)
}
</script>

<style lang="less" scoped>
.wrapper {
  height: 100vh;
  &-content {
    padding: 10px;
  }
}
</style>
