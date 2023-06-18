import { Tray, Menu, shell, app } from 'electron'
import icon from '../../../resources/tray.png?asset'
class trayController {
  constructor() {
    this.tray = null
  }
  create(window) {
    console.log('创建系统托盘')
    // 托盘菜单功能列表
    let trayMenuTemplate = [
      {
        label: '软件官网',
        click: () => {
          process.nextTick(() => {
            shell.openExternal('https://www.baidu.com/')
          })
        }
      },
      {
        label: '显示窗口',
        click: function () {
          if (window && !window.isFocused()) {
            window.show()
          }
        }
      },
      // { type: 'separator' },
      // {
      //   label: '系统设置',
      //   click: () => {
      //     console.log('ipcRenderer', ipcRenderer)
      //     ipcRenderer.invoke('open-subs')
      //   }
      // },
      { type: 'separator' },
      {
        label: '退出',
        click: function () {
          app.quit()
        }
      }
    ]
    this.tray = new Tray(icon)
    this.tray.setToolTip('electron-vite-multi')
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
    this.tray.setContextMenu(contextMenu)
    this.tray.on('double-click', () => {
      if (window && !window.isFocused()) {
        window.show()
      }
    })
  }
}

const tray = new trayController()

export default tray
