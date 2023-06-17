<script setup>
import { ref, reactive } from 'vue'
// import { useTheme } from '../../hooks/useTheme'
import { ConfigProvider } from 'ant-design-vue'
// const { DarkMode } = useTheme()
const prefix = ref('custom-default')
const lightColor = {
  primaryColor: '#108ee9',
  layoutSiderBackground: '#e3e4e3',
  layoutBodyBackground: '#ffffff',
  layoutFooterBackground: '#f2f2f2',
  layoutHeaderBackground: '#f3f3f3'
}
const darkColor = {
  primaryColor: '#108ee9',
  layoutSiderBackground: '#3e3f3f',
  layoutBodyBackground: '#262626',
  layoutFooterBackground: '#1a1a1a',
  layoutHeaderBackground: '#171717'
}
const theme = ref(lightColor)
const login = async () => {
  window.api.openMainWindow()
}
const changeTheme = () => {
  // DarkMode(false)
  if (prefix.value === 'custom-default') {
    prefix.value = 'custom-dark'
    theme.value = darkColor
  } else {
    prefix.value = 'custom-default'
    theme.value = lightColor
  }
  // toggleTheme({ scopeName: 'theme-dark' })
}
ConfigProvider.config({
  prefixCls: prefix.value,
  theme: { ...theme.value }
})
</script>

<template>
  <ConfigProvider :prefix-cls="prefix">
    <a-layout class="wrapper">
      <!-- <a-layout-header>Header</a-layout-header> -->
      <a-layout>
        <a-layout-sider width="60px">Sider</a-layout-sider>
        <a-layout-content>
          <a-layout style="height: 100vh;">
            <a-layout-sider width="260px">Sider</a-layout-sider>
            <a-layout>
              <a-button type="primary" @click="changeTheme">换主题</a-button>
              <a-divider></a-divider>
              <a-button type="primary" block @click="login">按钮</a-button>
            </a-layout>
          </a-layout>
        </a-layout-content>
      </a-layout>
      <!-- <a-layout-footer>Footer</a-layout-footer> -->
    </a-layout>
  </ConfigProvider>
</template>

<style lang="less">
@root-entry-name: variable;
@import '../../common/themes/theme-default.css';
@import '../../common/themes/theme-dark.css';
.wrapper {
  height: 100vh;
}
</style>
