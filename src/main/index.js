import { app, BrowserWindow, screen } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import loginWindw from './windows/login'
import pools from './windows/pools'
import IpcEvent from './events'
import sqlite from './controller/db.controller'
app.on('will-finish-launching', () => {
  global.winObj = {
    winMap: new Map()
  }
})

app.whenReady().then(() => {
  sqlite.create()
  IpcEvent(BrowserWindow)
  const winPools = new pools(BrowserWindow)
  // 窗口池创建
  winPools.createMain(screen)
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  loginWindw(BrowserWindow)
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) loginWindw(BrowserWindow)
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
