// packages

require('dotenv').config()
const express = require('express')
require('express-async-errors')
const path = require('path')
const app = express()
const mongoSanitize = require('express-mongo-sanitize')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const compression = require('compression')

// routes
const morgan = require('./config/morgan')
const routes = require('./routes')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}
app.use(cors({ credentials: true, origin: [process.env.CORS_ORIGIN] }))

app.use(helmet({ crossOriginResourcePolicy: false }))

app.use(xss())

app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(mongoSanitize())

app.use(compression())

// my routes


app.get('/', (req, res) => {
  return res.json({ message: '🚀', status: 200 })
})

app.use('/api/v0', routes)

module.exports = app
