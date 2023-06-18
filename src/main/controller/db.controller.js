import sqliteDb from '../sqlite/db'
const _ = require('lodash')

class DbController {
  constructor() {
    this.sqliteFile = 'sqlite.db'
    let sqliteOptions = {
      driver: 'sqlite',
      default: {
        timeout: 6000
        // verbose: console.log // 打印sql语法
      }
    }
    this.sqliteDB = sqliteDb.connection(this.sqliteFile, sqliteOptions)
    this.dbInit()
  }
  dbInit() {
    console.log('sqlite is create')
  }
  /*
   * 检查并创建表 (sqlite)
   */
  async checkAndCreateTableSqlite(tableName = '') {
    if (_.isEmpty(tableName)) {
      throw new Error(`table name is required`)
    }
    // 检查表是否存在
    const userTable = this.sqliteDB.db.prepare(
      'SELECT * FROM sqlite_master WHERE type=? AND name = ?'
    )
    const result = userTable.get('table', tableName)
    //console.log('result:', result);
    if (result) {
      return
    }
    // openid 表
    // caselist 表
    // 创建表
    const create_table_user = `CREATE TABLE ${tableName}
     (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        openid CHAR(50) NOT NULL,
        name CHAR(50) NOT NULL,
        identityId CHAR(50) NOT NULL,
        role CHAR(20) NOT NULL,
        phoneId CHAR(20) NOT NULL,
        signFile CHAR(200) NOT NULL,
        createdTime TimeStamp NOT NULL DEFAULT CURRENT_TIMESTAMP
     );`
    this.sqliteDB.db.exec(create_table_user)
  }

  /*
   * 增 sqlAdd (sqlite)
   */
  async sqlAdd(data) {
    const table = 'user'
    await this.checkAndCreateTableSqlite(table)

    this.sqliteDB.db
      .prepare(
        `INSERT INTO ${table} (name, identityId, openid, role, phoneId, signFile) VALUES ($name, $identityId, $openid, $role, $phoneId, $signFile)`
      )
      .run(data)

    return true
  }

  /*
   * 删 sqlDelete (sqlite)
   */
  async sqlDelete(openid = '') {
    //console.log("delete name:", name);

    let table = 'user'
    await this.checkAndCreateTableSqlite(table)

    const delUser = this.sqliteDB.db.prepare(`DELETE FROM ${table} WHERE openid = ?`)
    delUser.run(openid)

    return true
  }

  /*
   * 改 sqlUpdate (sqlite)
   */
  async sqlUpdate(data) {
    // console.log("update :", data);
    const { name, identityId, role, phoneId, signFile, openid } = data
    let table = 'user'
    await this.checkAndCreateTableSqlite(table)

    const updateUser = this.sqliteDB.db.prepare(
      `UPDATE ${table} SET 
        name = ?,identityId = ?, role = ?, phoneId = ?, signFile = ?
       WHERE openid = ?`
    )
    updateUser.run(name, identityId, role, phoneId, signFile, openid)

    return true
  }

  /*
   * sqlGetOne (sqlite)
   */
  async sqlGetOne(openid = '') {
    let table = 'user'
    await this.checkAndCreateTableSqlite(table)

    const selectUser = this.sqliteDB.db.prepare(`SELECT * FROM ${table} WHERE openid = @openid`)
    const users = selectUser.all({ openid: openid })
    //console.log("select users:", users);
    return users
  }

  /*
   * sqlGetAll (sqlite)
   */
  async sqlGetAll(data) {
    //console.log("select all user");
    let table = 'user'
    await this.checkAndCreateTableSqlite(table)

    const selectAllUser = this.sqliteDB.db.prepare(`SELECT * FROM ${table} `)
    const allUser = selectAllUser.all()
    //console.log("select allUser:", allUser);
    return allUser
  }
}
const sqlite = new DbController()

export default sqlite
