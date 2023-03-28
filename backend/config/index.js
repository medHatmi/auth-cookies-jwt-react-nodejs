require('dotenv').config()
const winston = require('winston')

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack })
  }
  return info
})

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.NODE_ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `[${level}]: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
})

const settings = {
  auth: { username: process.env.TP_UUID, password: process.env.TP_PASSWORD, targetBranch: process.env.TP_BRANCH_CODE },
  debug: 2,
  production: false,
}

module.exports = {
  settings,
  logger,
}
