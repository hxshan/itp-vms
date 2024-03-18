const express = require('express')  
const Auth = require('../middleware/Auth')
const {createUser,getAllUsers,getAllRoles} = require('../controllers/userController')
const verifyJWT = require("../middleware/verifyJWT")


const router = express.Router()

router.post('/createuser',createUser)

router.get('/getall',getAllUsers)

router.get('/getallroles',getAllRoles)

module.exports = router;