const { Router } = require('express')
const {updateMemberAndOrg, addMember, getMember} = require('../controllers/users')
const authenticate = require('../middleware/auth')

const router = Router()
router.use(authenticate)


router.post('/', addMember) 

router.get('/', getMember)

router.put('/', updateMemberAndOrg)

module.exports = router