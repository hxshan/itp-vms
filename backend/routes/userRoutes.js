const express = require('express')  
//const Auth = require('../middleware/Auth')
const {createUser,getAllUsers,deleteUser} = require('../controllers/userController')
//const verifyJWT = require("../middleware/verifyJWT")
const Auth =require('../middleware/Auth')

const router = express.Router()

router.get('/',Auth,getAllUsers)
router.post('/',createUser)
//router.delete('/',deleteUser)



module.exports = router;