const router = require('express').Router()
const {
  login,
  register,
  logout,
  verifyOTP,
  sendToken,
} = require("../controllers/auth.js");


router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/verifyOTP", verifyOTP);
router.get("/token", sendToken);

module.exports = router;
