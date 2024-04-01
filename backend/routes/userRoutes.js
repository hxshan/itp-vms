const express = require('express')  
//const Auth = require('../middleware/Auth')
const {createUser,getAllUsers} = require('../controllers/userController')
//const verifyJWT = require("../middleware/verifyJWT")
const Auth =require('../middleware/Auth')

const router = express.Router()

router.get('/',Auth,getAllUsers)
router.post('/',createUser)



module.exports = router;