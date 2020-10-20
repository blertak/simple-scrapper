'use strict'

const { DataTypes, Model } = require('sequelize')
const db = require('../../helpers/db')

class Performance extends Model { }

Performance.init({
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: true
  },
  commissions: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  sales: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  leads: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clicks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  epc: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  impressions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cr: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Performance',
  timestamps: true,
  tableName: 'performances'
})

module.exports = Performance
