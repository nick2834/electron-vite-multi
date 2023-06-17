import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import { resolve, join } from 'path'
const glob = require('glob')

const getEntryPath = () => {
  const pageEntry = {}
  glob.sync('./src/renderer/**/index.html').forEach((entry) => {
    const pathArr = entry.split('/')
    const name = pathArr[pathArr.length - 2]
    pageEntry[name] = join(process.cwd(), `/src/renderer/${name}/index.html`)
  })
  delete pageEntry.pages
  delete pageEntry.index //此处是为了删除初始化页面，这个可根据页面需要自行决定
  console.log('pageEntry', process.cwd())
  return pageEntry // 整体效果如下图
}
export default defineConfig({
  root: './src/renderer',
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  // https://cn.electron-vite.org/guide/dev.html#%E5%A4%9A%E7%AA%97%E5%8F%A3%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F
  preload: {
    plugins: [externalizeDepsPlugin()]
    // build: {
    //   outDir: resolve(process.cwd(), 'dist/renderer') // 指定输出路径（相对于 项目根目录)
    // }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer'),
        '@utils': resolve('src/renderer/utils')
      }
    },
    plugins: [vue()],
    build: {
      outDir: resolve(process.cwd(), 'out/renderer'), // 指定输出路径（相对于 项目根目录)
      sourcemap: false, // 构建后是否生成 source map 文件
      chunkSizeWarningLimit: 1500, // 规定触发警告的 chunk(文件块) 大小
      assetsDir: 'static',
      minify: 'esbuild',
      rollupOptions: {
        // 自定义底层的 Rollup 打包配置
        input: getEntryPath()
      },
      emptyOutDir: true
    }
  }
})
