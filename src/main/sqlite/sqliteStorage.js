'use strict'

const assert = require('assert')
const fs = require('fs')
const path = require('path')
const Database = require('better-sqlite3')

class SqliteStorage {
  constructor(name, opt = {}) {
    assert(name, `db name ${name} Cannot be empty`)

    this.name = name
    this.mode = this.getMode(name)
    this.storageDir = this.getStorageDir()
    this.fileName = this._formatFileName(name)
    this.db = this._initDB(opt)
  }

  /**
   * 初始化db
   */
  _initDB(opt = {}) {
    let dbPath = this.name
    dbPath = path.join(this.storageDir, this.fileName)
    const db = new Database(dbPath, { timeout: 5000, ...opt })
    assert(fs.existsSync(dbPath), `error: storage ${dbPath} not exists`)
    return db
  }
  /**
   * 获取数据库存储路径
   * @returns
   */
  getStorageDir() {
    let storageDir = path.join(__dirname, '../data')
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir)
      fs.chmodSync(storageDir, '777')
    }
    return storageDir
  }
  /**
   * 获取file path 模式
   */
  getMode(name) {
    let mode = ''

    assert(path.extname(name) == '.db', `error: storage ${name} file ext name must be .db`)

    // 路径模式
    name = name.replace(/[/\\]/g, '/')
    if (name.indexOf('/') !== -1) {
      const isAbsolute = path.isAbsolute(name)
      if (isAbsolute) {
        mode = 'absolute'
      } else {
        mode = 'relative'
      }
      return mode
    }

    // 仅文件名
    mode = 'onlyName'

    return mode
  }
  /**
   * 获取文件名
   */
  _formatFileName(name) {
    let fileName = name
    if (this.mode != 'memory') {
      fileName = path.basename(name)
    }

    return fileName
  }
}

export default SqliteStorage
