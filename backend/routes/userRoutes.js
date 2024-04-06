const express = require('express')  
//const Auth = require('../middleware/Auth')
const {createUser,getAllUsers,deleteUser,getUserById,resetPassword,getDrivers} = require('../controllers/userController')
//const verifyJWT = require("../middleware/verifyJWT")
const Auth =require('../middleware/Auth')

const router = express.Router()

router.get('/',Auth,getAllUsers)
router.get('/drivers',getDrivers)
router.get('/:id',getUserById)
router.patch('/password/:id',resetPassword)
router.post('/',createUser)
//router.delete('/',deleteUser)



module.exports = router;