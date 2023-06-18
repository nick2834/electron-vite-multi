import { shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../../resources/icon.png?asset'
import platform from '../utils/platform'

const loginUrl = '/pages/Login/index.html'

export default function (BrowserWindow) {
  const loginWindow = new BrowserWindow({
    name: 'login',
    width: 300,
    height: 420,
    minimizable: false,
    resizable: false,
    maximizable: false,
    show: false,
    titleBarStyle: 'hidden',
    // titleBarOverlay: true,
    frame: !(platform.isWindows || platform.isLinux),
    autoHideMenuBar: true,
    ...(platform.isLinux ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    trafficLightPosition: {
      x: 4,
      y: 5
    }
  })
  const winID = loginWindow.webContents.id
  // map存储窗口ID
  global.winObj.winMap.set('login', winID)
  // 全局存储窗口对象
  global['winstates-' + winID] = loginWindow

  loginWindow.on('ready-to-show', () => {
    loginWindow.show()
  })

  loginWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    loginWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + loginUrl)
  } else {
    loginWindow.loadFile(join(__dirname, '../renderer/' + loginUrl))
  }
}
