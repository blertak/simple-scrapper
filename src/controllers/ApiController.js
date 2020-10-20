'use strict'

const httpStatus = require('http-status-codes')
const HttpError = require('../models/HttpError')
const User = require('../models/db/user')
const Performance = require('../models/db/performance')
const { isStrNumber } = require('../helpers/util')

class ApiController {
  async users (req, res, next) {
    try {
      let { perPage = '10', page = '1' } = req.query

      if (!isStrNumber(perPage) || !isStrNumber(page)) {
        throw new HttpError('Invalid query params', httpStatus.StatusCodes.BAD_REQUEST)
      }

      perPage = parseInt(perPage)
      page = parseInt(page)

      if (perPage < 1 || page < 1) {
        throw new HttpError('Invalid query params', httpStatus.StatusCodes.BAD_REQUEST)
      }

      const { rows, count } = await User.findAndCountAll({
        limit: perPage,
        offset: (page - 1) * perPage,
        order: [['uid', 'ASC']]
      })
      const totalPages = Math.ceil(count / perPage)

      return res.status(httpStatus.StatusCodes.CREATED).json({
        page, perPage, total: count, totalPages, rows
      })
    } catch (err) {
      next(err)
    }
  }

  async performances (req, res, next) {
    try {
      let { perPage = '10', page = '1' } = req.query

      if (!isStrNumber(perPage) || !isStrNumber(page)) {
        throw new HttpError('Invalid query params', httpStatus.StatusCodes.BAD_REQUEST)
      }

      perPage = parseInt(perPage)
      page = parseInt(page)

      if (perPage < 1 || page < 1) {
        throw new HttpError('Invalid query params', httpStatus.StatusCodes.BAD_REQUEST)
      }

      const { rows, count } = await Performance.findAndCountAll({
        limit: perPage,
        offset: (page - 1) * perPage,
        order: [['date', 'ASC']]
      })
      const totalPages = Math.ceil(count / perPage)

      return res.status(httpStatus.StatusCodes.CREATED).json({
        page, perPage, total: count, totalPages, rows
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ApiController
