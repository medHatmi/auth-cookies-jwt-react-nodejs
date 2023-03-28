const mongoose = require('mongoose')
const app = require('./app')
const { logger } = require('./config')

const PORT = process.env.PORT || 8000
const DB_OPTIONS = { dbName: process.env.DB_NAME, useNewUrlParser: true, useUnifiedTopology: true }

let server
const start = () => {
  try {
    mongoose.connect(process.env.MDB_CONNECT, DB_OPTIONS, (error) => {
      if (error) return logger.error(`\x1b[31m[ERROR]  ${error} \x1b[0m`)

      logger.info('\x1b[34m[DB] Connected to MongoDB! \x1b[0m')
      server = app.listen(PORT, () => logger.info(`\x1b[33m[SERVER] Server running on http://localhost:${PORT} \x1b[0m`))
    })
  } catch (error) {
    return logger.error(`\x1b[31m[ERROR]  ${error} \x1b[0m`)
  }
}
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}
const unexpectedErrorHandler = (error) => {
  logger.error(error)
  exitHandler()
}
start()

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) server.close()
})
