'use strict'

const httpStatus = require('http-status-codes')

const handler = (err, req, res, next) => {
  const statusCode = err.statusCode || httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
  const message = err.message || httpStatus.getStatusText(statusCode)

  return res.status(statusCode).json({ message })
}

module.exports = handler
