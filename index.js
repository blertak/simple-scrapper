'use strict'

const cors = require('cors')
const express = require('express')
const path = require('path')

const config = require('./src/config')
const logger = require('./src/helpers/logger')
const db = require('./src/helpers/db')
const errorMiddleware = require('./src/middlewares/error')
const notFoundMiddleware = require('./src/middlewares/notfound')
const routes = require('./src/routes')

let server = null
const app = express()

// server configs
app.use(cors())
app.use(express.static(path.join(__dirname, './public')))
app.use(routes)
app.use(notFoundMiddleware)
app.use(errorMiddleware)

process.on('SIGINT', async () => {
  if (server) server.close()
  await db.close()
  process.exit(0)
})

const start = async () => {
  try {
    await db.authenticate()
    await db.sync() // create tables if not exists

    server = app.listen(config.PORT, config.HOST, () => {
      logger.info(`Server is listening on ${config.HOST}:${config.PORT}`)
    })
  } catch (err) {
    logger.error(err)
    process.exit(-1)    
  }
}

start()
