import assert from 'assert'
import SqliteStorage from './sqliteStorage'
const _ = require('lodash')
const DB = {}

DB.connection = function (database, options = {}) {
  let driver = options.driver
  let opt = options.default || {}
  if (!_.includes(['sqlite'], driver)) {
    assert(database, `db driver ${driver} is not supported`)
  }
  if (_.isEmpty(database)) {
    assert(database, `db name ${database} Cannot be empty`)
  }
  return new SqliteStorage(database, opt)
}

export default DB
