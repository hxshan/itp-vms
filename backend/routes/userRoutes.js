const express = require('express')  
const Auth = require('../middleware/Auth')
const {loginUser,createUser,getAllUsers,getAllRoles} = require('../controllers/userController')



const router = express.Router()

router.post('/createuser',createUser)

router.post('/login',loginUser) 

router.get('/getall',getAllUsers)
router.get('/getallroles',getAllRoles)

module.exports = router;