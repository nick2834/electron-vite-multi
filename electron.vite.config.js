import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import { resolve, join } from 'path'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// https://blog.csdn.net/gaofengzks/article/details/129879677
const glob = require('glob')

const getEntryPath = () => {
  const pageEntry = {}
  glob.sync('./src/renderer/**/index.html').forEach((entry) => {
    const pathArr = entry.split('/')
    const name = pathArr[pathArr.length - 2]
    pageEntry[name] = join(process.cwd(), `/src/renderer/${name}/index.html`)
  })
  delete pageEntry.pages
  delete pageEntry.index
  return pageEntry
}
export default defineConfig({
  root: './src/renderer',
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer'),
        '@utils': resolve('src/renderer/utils')
      }
    },
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: true })]
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    build: {
      outDir: resolve(process.cwd(), 'out/renderer'), // 指定输出路径（相对于 项目根目录)
      sourcemap: false, // 构建后是否生成 source map 文件
      chunkSizeWarningLimit: 1500, // 规定触发警告的 chunk(文件块) 大小
      assetsDir: 'static',
      minify: 'esbuild',
      rollupOptions: {
        // 自定义底层的 Rollup 打包配置
        input: getEntryPath(),
        output: {
          compact: true,
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
          entryFileNames: 'static/js/[name].[hash].js',
          assetFileNames: 'static/[ext]/[name].[hash].[ext]',
          chunkFileNames: 'static/js/[name]-[hash].js'
        }
      },
      emptyOutDir: true
    }
  }
})
