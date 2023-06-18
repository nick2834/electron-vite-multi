<template>
  <a-layout class="wrapper">
    <a-layout-sider width="64px"></a-layout-sider>
    <a-layout-content class="wrapper-content flex flex-direction">
      <a-layout-header class="drag">header</a-layout-header>
      <a-layout-content class="flex-sub">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero molestias expedita esse aut
        cupiditate autem magni ratione nam! Ipsum eaque vel perspiciatis sint maxime non optio harum
        sunt alias placeat.
      </a-layout-content>
      <a-layout-footer>
        <!-- <a-button type="primary" @click="changeTheme">点击</a-button> -->

        <a-button type="primary" @click="openSubsWindow">open new window</a-button>
      </a-layout-footer>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { useTheme } from '@hooks/useTheme'
const isDark = useStorage('theme')
const { DarkMode } = useTheme()
watch(
  () => isDark,
  (val) => {
    let darkMode
    if (val.value === 'undefined') {
      darkMode = true
    } else {
      // String to Boolean
      darkMode = JSON.parse(val.value)
    }
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