'use strict'

const router = require('express').Router()
const ApiController = require('../controllers/ApiController')

const apiController = new ApiController()

router.get('/api/v1/users', apiController.users.bind(apiController))
router.get('/api/v1/performances', apiController.performances.bind(apiController))

module.exports = router
