import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { MESSAGES } from "../constants/message.constants.js";
import AuthRepository from "../repositories/auth.repository.js";
import AuthorityRepository from "../repositories/authority.repository.js";
import UserRepository from "../repositories/user.repository.js";
import { generateAccessToken, generateRefreshToken } from "../util/auth.util.js";
import { HttpError } from "../util/http-error.util.js";


class AuthService{
    authRepository = new AuthRepository()
    userRepository = new UserRepository()
    authorityRepository = new AuthorityRepository()

  // 회원가입
  signUp = async ({ username, password, nickname }) => {
    // 유저명 중복확인
    const existingName = await this.userRepository.getByName(username);
    if (existingName) {
      throw new HttpError.Conflict(MESSAGES.AUTH.SIGN_UP.CONFLICT);
    }

    if(!password){
        throw new HttpError.BadRequest(HTTP_STATUS.BAD_REQUEST, MESSAGES.AUTH.SIGN_UP.BAD_REQUEST)
    }

    // user 생성하기
    const user = await this.userRepository.create(
      { username, password, nickname }
    );

    // authority 부여
    await this.authorityRepository.create(user.id);

    // password 제외하기
    const createdUser = await this.userRepository.getByName( username )

    const responseData = {
        username: createdUser.username,
        nickname: createdUser.nickname,
        authorities: createdUser.authorities
    }

    return responseData;
  };

    // 로그인
    login = async ({username, password}) => {
          // user 찾아오기
          const user = await this.userRepository.getByName( username );

          if(!user){
            throw new HttpError.NotFound(MESSAGES.AUTH.LOGIN.NOT_FOUND)
          }
            
          // 비밀번호 검증
          if(user.password != password){
            throw new HttpError.Unauthorized(MESSAGES.AUTH.LOGIN.UNAUTHORIZED)
          }

          const payload = { userid: user.id }

          const accessToken = generateAccessToken(payload)
          const refreshToken = generateRefreshToken(payload)

          await this.authRepository.upsertRefreshToken(user.id, refreshToken)

          return { accessToken, refreshToken }
      };
}

export default AuthService