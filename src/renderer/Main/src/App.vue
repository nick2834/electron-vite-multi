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
      </a-layout-footer>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from '../../hooks/useTheme'
const { DarkMode } = useTheme()
const isDark = ref(false)
const changeTheme = () => {
  isDark.value = !isDark.value
  DarkMode(isDark.value)
}
</script>

<style>
</style>