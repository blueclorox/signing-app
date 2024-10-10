import { HTTP_STATUS } from "../constants/http-status.constants";
import { MESSAGES } from "../constants/message.constants";
import { HttpError } from "../util/http-error.util";


class AuthService{
    constructor(authRepository, userRepository, authorityRepository){
        this.authRepository = authRepository
        this.userRepository = userRepository
        this.authorityRepository = authorityRepository
    }

  // 회원가입
  signUp = async ({ username, password, nickname }) => {
    // 유저명 중복확인
    const existingName = await this.userRepository.getByName(username);
    if (existingName) {
      throw new HttpError.Conflict(MESSAGES.AUTH.SIGN_UP.CONFLICT);
    }

    // Transaction 시작
    const createdUser = await this.userRepository.createTransaction(async (tx) => {
      // user 생성하기
      const user = await this.userRepository.create(
        {
          email,
          password,
          nickname,
        },
        { tx },
      );

      // authority 부여
      await this.authorityRepository.create(user.id, { tx });

      return user;
    });

    // password 제외하기
    const { password: _, ...userWithoutPassword } = createdUser;

    return userWithoutPassword;
  };

    // 로그인
    login = async ({username, password}) => {
        try {
          // user 찾아오기
          const user = await this.authService.signIn(username, password);
    
          // 성공 메세지 반환
          res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            message: MESSAGES.AUTH.LOGIN.SUCCEED,
            data: user,
          });
        } catch (error) {
          next(error);
        }
      };
}

export default AuthService