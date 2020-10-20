'use strict'

const httpStatus = require('http-status-codes')
const HttpError = require('../models/HttpError')

const handler = (req, res, next) => {
  const statusCode = httpStatus.StatusCodes.NOT_FOUND
  return next(new HttpError(httpStatus.getStatusText(statusCode), statusCode))
}

module.exports = handler
