'use strict'

const { DataTypes, Model } = require('sequelize')
const db = require('../../helpers/db')

class User extends Model { }

User.init({
  uid: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 255]
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 255]
    }
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 255]
    }
  }
}, {
  sequelize: db,
  modelName: 'User',
  timestamps: true,
  tableName: 'users'
})

module.exports = User
