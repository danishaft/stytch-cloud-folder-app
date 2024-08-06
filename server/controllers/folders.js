const {
    createFolder,
    fetchFolder,
    fetchFolders,
} = require('../helpers/folders')

const addFolder = async (req, res) => {
    try {
        const { name } = req.body
        const { member } = req.user
        const folder = await createFolder(name, member?.member_id)
        res.status(200).json({ folder })
    } catch (error) {
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or orgId',
            message: error.message || 'An error occurred while adding folder',
        })
    }
}

const getFolder = async (req, res) => {
    try {
        const folder_id = req.params.folder_id
        const folder = await fetchFolder(folder_id)
        res.status(200).json({ folder })
    } catch (error) {
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or orgId',
            message: error.message || 'An error occurred while adding member',
        })
    }
}

const getAllFolders = async (req, res) => {
    try {
        const { member } = req.user
        const folders = await fetchFolders(member?.member_id)
        res.status(200).json({ folders })
    } catch (error) {
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or orgId',
            message: error.message || 'An error occurred while adding member',
        })
    }
}

module.exports = {
    addFolder,
    getFolder,
    getAllFolders,
}
