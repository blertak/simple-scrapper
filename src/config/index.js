'use strict'

const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })
const env = require('env-var')

const config = {
  PORT: env.get('PORT').default(3000).asPortNumber(),
  HOST: env.get('HOST').default('0.0.0.0').asString(),
  DB_CONNECTION_STRING: env.get('DB_CONNECTION_STRING').required().asString()
}

module.exports = config
