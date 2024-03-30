const express = require('express')  
const Auth = require('../middleware/Auth')
const {createUser,getAllUsers} = require('../controllers/userController')
const verifyJWT = require("../middleware/verifyJWT")


const router = express.Router()

router.post('/createuser',createUser)
router.get('/getall',getAllUsers)


module.exports = router;