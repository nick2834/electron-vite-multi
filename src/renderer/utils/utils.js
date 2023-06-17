// 切换css
export const changeTheme = (theme) => {
  const head = document.head
  document.getElementById('theme')?.remove()
  const styleDom = document.createElement('style')
  styleDom.id = 'theme'
  styleDom.innerHTML = theme
  head.appendChild(styleDom)
}

// 改变css变量
export const changeCss = (css, value) => {
  const body = document.body.style
  body.setProperty(css, value)
}
