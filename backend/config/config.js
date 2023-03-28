const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../.env') })

const envVarsSchema = Joi.object()
  .keys({
    APP_NAME: Joi.string().required().description('name of the app'),
    CORS_ORIGIN: Joi.string().required().description('cors urls'),
    NODE_ENV: Joi.string().valid('production', 'development').required(),
    PORT: Joi.number().default(3000),
    MDB_CONNECT: Joi.string().required().description('Mongo DB url'),
    JWT_TOKEN_SECRET: Joi.string().required().description('JWT secret key'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USER: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    FROM_EMAIL: Joi.string().description('the from field in the emails sent by the app'),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) throw new Error(`Config validation error: ${error.message}`)

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MDB_CONNECT,
    options: { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  },
  jwt: { secret: envVars.JWT_TOKEN_SECRET },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: { user: envVars.SMTP_USERNAME, pass: envVars.SMTP_PASSWORD },
    },
    from: envVars.FROM_EMAIL,
  },
}
