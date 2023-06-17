// 窗口池子
import { join } from 'path'
import platform from '../utils/platform'

class windowPools {
  constructor(ctx) {
    this.app = ctx
    this.config = {
      center: true,
      frame: !(platform.isWindows || platform.isLinux),
      show: false,
      titleBarStyle: 'hidden',
      webPreferences: {
        webSecurity: false, // 跨域问题 -> 打开注释
        contextIsolation: true, // false -> 可在渲染进程中使用electron的api，true->需要bridge.js(contextBridge)
        nodeIntegration: true,
        preload: join(__dirname, '../preload/index.js')
      },
      // mac 自定义红绿灯位置
      trafficLightPosition: {
        x: 4,
        y: 5
      }
    }
  }
  createMain(screen) {
    const { bounds } = screen.getPrimaryDisplay()
    const { width, height } = bounds
    const mainWin = new this.app({
      title: '主窗口',
      minWidth: width * 0.65,
      // height: height * .8,
      minHeight: height * 0.8,
      ...this.config
    })
    mainWin.center()
    const winID = mainWin.webContents.id
    // map存储窗口ID
    global.winObj.winMap.set('main', winID)
    // 全局存储窗口对象
    global['winstates-' + winID] = mainWin
    // 创建子窗口
    this.createSub()
  }
  createSub() {
    const subWin = new this.app({
      title: '子窗口',
      // width: 400,
      minWidth: 400,
      height: 650,
      minHeight: 650,
      ...this.config
    })

    subWin.center()
    const winID = subWin.webContents.id
    // map存储窗口ID
    global.winObj.winMap.set('subs', winID)
    // 全局存储窗口对象
    global['winstates-' + winID] = subWin

    subWin.on('closed', async function () {
      // 窗口关闭，需删除对应的全局窗口
      delete global['winstates-' + winID]
      global.winObj.winMap.delete('subs')
    })
  }
}

export default windowPools
