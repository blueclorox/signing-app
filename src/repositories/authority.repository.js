import { prisma } from '../util/prisma.util.js'

export class AuthorityRepository{
    create = async (userId) => {
        const createdAuthority = await prisma.authority.create({
            data: { userId: userId }
        })

        return createdAuthority
    }
}

export default AuthorityRepository