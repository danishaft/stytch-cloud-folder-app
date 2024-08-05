const { getUser, createUser, updateUser } = require("../helpers/users");
const stytchClient = require("../utils/stytch.config");

const addMember = async (req, res) => {
    try{
        const {name, email, member_id} = req.body;
        const existingMember = await getUser(member_id);
        let isNewUser = false;
        if(!existingMember) {
            await createUser(name, email, member_id);
            isNewUser = true;
        }
        res.status(200).json({message: 'success', isNewUser})
    }catch(error){
        console.error('Error in addMember controller:', error)
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or orgId',
            message:
                error.message || 'An error occurred while adding member',
        })
    }
}

const updateMember = async (req, res) => {
    try{
        const sessionToken = req.cookies.stytch_session;
        const { member } = req.user;
        console.log(member)
        const name = `${req.body.firstName} ${req.body.lastName}`

        const response = await stytchClient.organizations.members.update(
            {
                organization_id: member?.organization_id,
                member_id: member?.member_id,
                name,
            },
            {
                authorization: {
                  session_token: sessionToken,
                },
            },
        )
        const updatedMember = await updateUser(member?.member_id, response.member?.name);
        res.status(200).json({
            user: updatedMember
        })
    }catch(error){
        console.error('Error in updateMember controller:', error)
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or orgId',
            message:
                error.message || 'An error occurred while updating member',
        })
    }
}

const getMember = async (req, res) => {
    try{
        const { member } = req.user;
        console.log(member)
        const response = await stytchClient.organizations.members.get(
            {
                organization_id: member?.organization_id,
                member_id: member?.member_id,
            }
        )
        const user = await updateUser(member?.member_id, response?.member.name)
        console.log(user)
        res.status(200).json({user})
    }catch(error){
        console.error('Error in getMember controller:', error)
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or orgId',
            message:
                error.message || 'An error occurred while getting member',
        })
    }
}
module.exports = {
    addMember,
    updateMember,
    getMember
}