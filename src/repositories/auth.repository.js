import { prisma } from '../util/prisma.util.js'

export class AuthRepository{
    upsertRefreshToken = async ( userId, refreshToken ) => {
        await prisma.auth.upsert({
            where: { userId },
            update: { refreshToken },
            create: { userId, refreshToken },
          });
    }
}

export default AuthRepository