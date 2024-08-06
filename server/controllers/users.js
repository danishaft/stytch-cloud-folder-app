const { getUser, createUser, updateUser } = require('../helpers/users')
const stytchClient = require('../utils/stytch.config')

const addMember = async (req, res) => {
    try {
        const { name, email, member_id } = req.body
        const existingMember = await getUser(member_id)
        let isNewUser = false
        if (!existingMember) {
            await createUser(name, email, member_id)
            isNewUser = true
        }
        res.status(200).json({ message: 'success', isNewUser })
    } catch (error) {
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or orgId',
            message: error.message || 'An error occurred while adding member',
        })
    }
}

const updateMemberAndOrg = async (req, res) => {
    try {
        const sessionToken = req.cookies.stytch_session
        const { member } = req.user
        const name = `${req.body.firstName} ${req.body.lastName}`
        const orgName = req.body.orgName

        const memberResponse = await stytchClient.organizations.members.update(
            {
                organization_id: member?.organization_id,
                member_id: member?.member_id,
                name,
            },
            {
                authorization: {
                    session_token: sessionToken,
                },
            }
        )
        const updatedMember = await updateUser(
            member?.member_id,
            memberResponse.member?.name
        )

        const orgResponse = await stytchClient.organizations.update(
            {
                organization_id: member?.organization_id,
                organization_name: orgName,
            },
            {
                authorization: {
                    session_token: sessionToken,
                },
            }
        )
        const {
            organization_id,
            organization_name,
            organization_logo_url,
            organization_slug,
        } = orgResponse.organization
        const updatedOrg = {
            organization_id,
            organization_name,
            organization_slug,
            organization_logo_url,
        }
        res.status(200).json({
            user: updatedMember,
            organization: updatedOrg,
        })
    } catch (error) {
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or orgId',
            message: error.message || 'An error occurred while updating member',
        })
    }
}

const getMember = async (req, res) => {
    try {
        const { member } = req.user
        const response = await stytchClient.organizations.members.get({
            organization_id: member?.organization_id,
            member_id: member?.member_id,
        })
        const user = await updateUser(member?.member_id, response?.member.name)
        res.status(200).json({ user })
    } catch (error) {
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or orgId',
            message: error.message || 'An error occurred while getting member',
        })
    }
}
module.exports = {
    addMember,
    updateMemberAndOrg,
    getMember,
}
