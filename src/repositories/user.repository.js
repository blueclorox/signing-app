import { prisma } from '../util/prisma.util.js'

export class UserRepository {

  getByName = async ( username ) => {
    const user = await prisma.user.findUnique({ where: { username }})

    return user
  }

  create = async ({ username, password, nickname }) => {
    const createdUser = await prisma.user.create({
        data: { username, password, nickname },
    })

    return createdUser
  }

}

export default UserRepository