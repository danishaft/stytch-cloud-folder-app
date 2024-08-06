const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const createUser = async (name, email, member_id) => {
    try {
        const user = await prisma.user.create({
            data: {
                id: member_id,
                name,
                email,
            }
        })
        return user;
    }catch(error){
        throw new Error('Could not create user', error.message);
    }finally{
        await prisma.$disconnect()
    }
}

const getUser = async (member_id) => {
    try {
        const user = await prisma.user.findUnique({
            where: {id: member_id}
        })
        return user;
    }catch(error){
        throw new Error('Could not get user', error.message);
    }finally{
        await prisma.$disconnect()
    }
}

const updateUser = async (member_id, name) => {
    try {
        const user = await prisma.user.update({
            where: {id: member_id},
            data: {name: name}
        })
        return user
    }catch(error){
        throw new Error('Could not update user', error.message);
    }finally{
        await prisma.$disconnect()
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser
}