const express = require('express')
const {login,refresh,logout}=require("../controllers/authController")
const verifyJWT = require("../middleware/verifyJWT")

const router = express.Router()


router.post('/login',login)

router.get("/refresh",refresh)
router.get("/logout",logout)

module.exports = router