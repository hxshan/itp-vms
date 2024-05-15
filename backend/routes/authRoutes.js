const express = require('express')
const {login,refresh,logout}=require("../controllers/authController")

const router = express.Router()


router.post('/login',login)


router.post('/client/login',login)


router.get("/refresh",refresh)
router.get("/logout",logout)

module.exports = router