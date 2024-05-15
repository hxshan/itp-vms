const express = require('express')
const {login,refresh,logout,clientLogin}=require("../controllers/authController")

const router = express.Router()


router.post('/login',login)


router.post('/client/login',clientLogin)


router.get("/refresh",refresh)
router.get("/logout",logout)

module.exports = router