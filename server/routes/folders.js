const { Router } = require('express')
const {
    getFolder,
    addFolder,
    getAllFolders,
} = require('../controllers/folders')
const authenticate = require('../middleware/auth')

const router = Router()
router.use(authenticate)

router.post('/', addFolder)
router.get('/:folder_id', getFolder)
router.get('/', getAllFolders)

module.exports = router
