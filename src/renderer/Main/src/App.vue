<template>
  <a-layout>
    <a-layout-sider width="64px"></a-layout-sider>
    <a-layout-content>
      <a-layout-header>
        <a href="../Subs/index.html">跳转SubsWindow</a>
      </a-layout-header>
      <a-layout-content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero molestias expedita esse aut
        cupiditate autem magni ratione nam! Ipsum eaque vel perspiciatis sint maxime non optio harum
        sunt alias placeat.
      </a-layout-content>
      <a-layout-footer>
        <a-button type="primary" @click="changeTheme">点击</a-button>

        <a-button @click="openSubsWindow">打开新窗口</a-button>
      </a-layout-footer>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { useTheme } from '../../hooks/useTheme'
const isDark = useStorage('theme')
const { DarkMode } = useTheme()
watch(
  () => isDark,
  (val) => {
    // String to Boolean
    let darkMode = JSON.parse(val.value)
    DarkMode(darkMode)
  },
  { immediate: true, deep: true }
)
console.log(isDark)
const openSubsWindow = () => {
  window.api.openWindow('subwin')
}
</script>

<style>
</style>