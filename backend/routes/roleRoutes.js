const express = require('express')  
const {getAllRoles, addrole,getRoleById,deleteRole,updateRole} = require('../controllers/roleController')
const router = express.Router()


router.get('/',getAllRoles)
router.get('/:id',getRoleById)
router.post('/',addrole)
router.put('/:id',updateRole)
router.delete('/:id',deleteRole)


module.exports = router;