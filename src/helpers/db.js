'use strict'

const { Sequelize } = require('sequelize');
const config = require('../config')

const sequelize = new Sequelize(config.DB_CONNECTION_STRING, {
  logging: false
})

module.exports = sequelize
