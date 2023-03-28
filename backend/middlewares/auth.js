const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return res.status(httpStatus.UNAUTHORIZED).json({ message: "Vous n'êtes pas connecté, désolé" })

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(httpStatus.UNAUTHORIZED).json({ message: "Vous n'êtes pas connecté, désolé" })

    req.user = user
    next()
  })
}

module.exports = auth
