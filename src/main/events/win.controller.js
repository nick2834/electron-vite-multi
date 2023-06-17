import platform from '../utils/platform'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { BrowserView, BrowserWindow } from 'electron'
import trayControl from './tray.controller'
let view = null
/**
 * 窗口插件
 * @class
 */
class WindowController {
  constructor() {
    this.winCfg = {
      center: true,
      frame: !(platform.isWindows || platform.isLinux),
      show: false,
      titleBarStyle: 'hidden',
      webPreferences: {
        webSecurity: false,
        contextIsolation: false,
        nodeIntegration: true,
        preload: join(__dirname, '../preload/index.js')
      },
      trafficLightPosition: {
        x: 4,
        y: 5
      }
    }
  }
  loadURL(win, url) {
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      win.loadURL(process.env['ELECTRON_RENDERER_URL'] + url)
    } else {
      win.loadFile(join(__dirname, '../renderer/' + url))
    }
  }
  /**
   * 创建窗口
   *  首次创建 保存对应的窗口ID
   *  二次点击
   *    查询窗口ID是否存在
   *    存在  show
   *    不存在 创建并保存
   * 简写 coow
   * @param { name } params 通过name获取窗口池存在的窗口
   * @param {*} params
   * @returns
   */
  openWindow(params) {
    const { name, route, options } = params
    const globalWindow = global.winObj.winMap // 全局窗口池
    const winID = globalWindow.get(name)
    // 窗口已删除
    if (!winID) {
      // 重新向窗口池添加窗口
      this.addWindowPool(options).then(() => {
        this.openWindow(params)
      })
      return
    }
    const currentWindow = global['winstates-' + winID]

    if (name === 'main') {
      const loginID = globalWindow.get('login')
      global['winstates-' + loginID].close() // 或者close
      // 彻底删除登录窗口进程
      delete global['winstates-' + loginID]
      global.winObj.winMap.delete('login')
      this.loadURL(currentWindow.webContents, route)
      // 创建系统托盘
      trayControl.create(currentWindow)
    } else {
      if (name === 'subs') {
        currentWindow.setSize(400, 650)
        currentWindow.maximizable = false
        currentWindow.resizable = false
      }
      if (options && options.width) {
        currentWindow.setSize(options.width, options.height)
      }
      // 向框架窗口添加webview
      this.loadWebview(currentWindow, route)
      // 子窗口关闭是需清除标签数组
      currentWindow.on('close', () => {
        delete global['winstates-' + winID]
        this.destroyBrowserView(currentWindow)
      })
      currentWindow.webContents.on('close', async () => {
        console.log('webContents close')
      })
      currentWindow.webContents.on('destroyed', () => {
        console.log('destroyed')
      })
    }
    currentWindow.center()
    currentWindow.show()
  }
  /**
   * 关闭窗口
   * @param {*} args
   */
  closeWindow(args) {
    const name = args?.windowName
    if (name === 'login') {
      // 登录窗口
      this.app.appQuit()
    } else {
      const currWin = BrowserWindow.getFocusedWindow()
      // 非登录窗口
      if (name === 'subs') {
        // console.log(currWin)
        this.destroyBrowserView(currWin)
        // browserviewList = []
        // tempList = []
        // currWin.close()
        // return
      }
      currWin.hide()
    }
  }
  // 增加窗口池
  addWindowPool(options) {
    let name = options?.name || 'subs'
    return new Promise((resolve) => {
      const subWin = new BrowserWindow({
        title: '子窗口',
        name: 'subs',
        // width: 400,
        minWidth: 400,
        height: 650,
        minHeight: 650,
        ...this.winCfg
      })
      subWin.center()
      // subWin.loadURL(path)
      const winID = subWin.webContents.id
      // map存储窗口ID
      global.winObj.winMap.set(name, winID)
      // 全局存储窗口对象
      global['winstates-' + winID] = subWin
      // subWin.on('close', async function (event) {
      //   // 窗口关闭，需删除对应的全局窗口
      //   delete global['winstates-' + winID]
      //   global.winObj.winMap.delete(name)
      // })
      resolve(winID)
    })
  }
  /**
   * 加载webview内容
   * @param {*} win
   * @param {*} url
   */
  loadWebview(win, url) {
    // console.log('loadWebview', view)
    this.destroyBrowserView()
    view = new BrowserView({
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        contextIsolation: false
      }
    })
    // 使用setBrowserView会导致内存泄漏闪退
    win.addBrowserView(view)
    view.setBounds({ x: 0, y: 0, width: win.getSize()[0], height: win.getSize()[1] })
    view.setAutoResize({ width: true, height: true })
    this.loadURL(view.webContents, url)
    view.webContents.openDevTools()
  }
  // 销毁browserview
  destroyBrowserView() {
    if (view) {
      view.webContents.destroy()
      // win.removeBrowserView(view)
      view = null
    }
  }
}

const winControl = new WindowController()

export default winControl
