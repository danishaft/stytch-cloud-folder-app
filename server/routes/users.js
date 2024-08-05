const { Router } = require('express')
const {updateMember, addMember, getMember} = require('../controllers/users')
const authenticate = require('../middleware/auth')

const router = Router()
router.use(authenticate)

//create new member if none exist
router.post('/', addMember) 
//get a member
router.get('/', getMember)
//update a member
router.put('/', updateMember)

module.exports = router