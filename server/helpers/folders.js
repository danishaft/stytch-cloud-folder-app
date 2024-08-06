const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createFolder = async (name, member_id) => {
    try {
        const folder = await prisma.folder.create({
            data: {
                name,
                creator: { connect: { id: member_id } },
            },
        })
        return folder
    } catch (error) {
        throw new Error('Could not create folder', error.message)
    } finally {
        await prisma.$disconnect()
    }
}

const fetchFolder = async (folder_id) => {
    try {
        const folder = await prisma.folder.findUnique({
            where: { id: folder_id },
        })
        return folder
    } catch (error) {
        throw new Error('Could not get folder', error.message)
    } finally {
        await prisma.$disconnect()
    }
}

const fetchFolders = async (member_id) => {
    try {
        const folders = await prisma.folder.findMany({
            where: { creatorId: member_id },
        })
        return folders
    } catch (error) {
        throw new Error('Could not fetch folder', error.message)
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {
    createFolder,
    fetchFolder,
    fetchFolders,
}
