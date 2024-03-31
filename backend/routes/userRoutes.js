const express = require('express')  
//const Auth = require('../middleware/Auth')
const {createUser,getAllUsers} = require('../controllers/userController')
//const verifyJWT = require("../middleware/verifyJWT")


const router = express.Router()

router.get('/',getAllUsers)
router.post('/',createUser)



module.exports = router;