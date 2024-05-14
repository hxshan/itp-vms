const express = require('express')  
const {getAllRoles, addrole,getRoleById,deleteRole,updateRole} = require('../controllers/roleController')
const Auth = require('../middleware/Auth')
const router = express.Router()


router.get('/',getAllRoles)
router.get('/:id',getRoleById)
router.post('/',Auth,addrole)
router.put('/:id',Auth,updateRole)
router.delete('/:id',Auth,deleteRole)


module.exports = router;