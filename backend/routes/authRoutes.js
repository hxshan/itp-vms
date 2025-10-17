const express = require('express')
const {login,refresh,logout,clientLogin, googleAuthStart, googleAuthCallback}=require("../controllers/authController")

const router = express.Router()


router.post('/login',login)


router.post('/client/login',clientLogin)


router.get("/google", googleAuthStart)
router.get("/google/callback", googleAuthCallback)

router.get("/refresh",refresh)
router.get("/logout",logout)

module.exports = router