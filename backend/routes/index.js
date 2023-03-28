const router = require('express').Router()

const defaultRoutes = [
  { path: '/auth', route: require('./auth') },
  { path: '/users', route: require('./users') },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

module.exports = router
