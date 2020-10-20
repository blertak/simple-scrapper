'use strict'

/**
 * @param {string} value
 */
const isStrNumber = (value) => {
  return typeof value === 'string' && /^\d+$/.test(value)
}

module.exports = {
  isStrNumber
}
