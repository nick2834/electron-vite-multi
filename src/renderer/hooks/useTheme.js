//引入ant design vue的css 白色和黑色的less文件都要引入
import { watch } from 'vue'
import light from '@/common/themes/theme-default.less?inline'
import dark from '@/common/themes/theme-dark.less?inline'
import { changeTheme, changeCss } from '@/utils/utils'
import { useStorage } from '@vueuse/core'
export function useTheme() {
  const isDark = useStorage('theme')
  watch(
    () => isDark,
    (val) => {
      // String to Boolean
      let darkMode = JSON.parse(val.value)
      DarkMode(darkMode)
    },
    // { immediate: true, deep: true }
  )
  const DarkMode = (isDark) => {
    if (isDark) {
      changeTheme(dark)
      changeCss('--page-bg-color', '#141414')
      changeCss('--head-bg-color', 'rgba(0, 0, 0, 0.5)')
      changeCss('--line-color', '#2e2e2e')
      changeCss('--content-bg-color', 'rgb(255 255 255 / 4%)')
      changeCss('--text-color', 'rgba(255, 255, 255, 0.85)')
    } else {
      changeTheme(light)
      changeCss('--page-bg-color', 'white')
      changeCss('--head-bg-color', 'rgba(255, 255, 255, 0.7)')
      changeCss('--line-color', '#e8e8e8')
      changeCss('--content-bg-color', '#f0f2f5')
      changeCss('--text-color', 'rgba(0, 0, 0, 0.85)')
      changeCss('--ant-primary-color', '#0052d9')
    }
    localStorage.setItem('theme', isDark)
  }
  return {
    DarkMode
  }
}
