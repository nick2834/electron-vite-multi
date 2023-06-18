import { ipcMain, BrowserWindow } from 'electron'
import winControl from './win.controller'
function getWinId(winName) {
  return global.winObj.winMap.get(winName)
}

export default function () {
  // 打开主窗口
  ipcMain.handle('mainwin', () => {
    winControl.openWindow({
      name: 'main',
      route: '/pages/Main/index.html'
    })
  })
  ipcMain.handle('subwin', () => {
    winControl.openWindow({
      name: 'subs',
      route: '/pages/Subs/index.html'
    })
  })
  ipcMain.handle('window-min', (event, parmas) => {
    const winId = getWinId(parmas.name)
    global['winstates-' + winId].minimize()
  })

  ipcMain.handle('window-max', (_event, _parmas) => {
    if (BrowserWindow.getFocusedWindow().isMaximized()) {
      BrowserWindow.getFocusedWindow().unmaximize()
    } else {
      BrowserWindow.getFocusedWindow().maximize()
    }
  })
}
