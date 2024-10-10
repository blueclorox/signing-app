import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { MESSAGES } from "../constants/message.constants.js";
import AuthService from "../services/auth.service.js";

export class AuthController{   
    authService = new AuthService();

    // 회원가입
    signUp = async (req, res, next) => {
        try {
          // 작성 정보 받아오기
          const { username, password, nickname } = req.body;
    
          // user 생성하기
          const user = await this.authService.signUp({
            username,
            password,
            nickname,
          });
    
          // 성공 메세지 반환
          return res.status(HTTP_STATUS.CREATED).json({
            status:HTTP_STATUS.CREATED,
            message:MESSAGES.AUTH.SIGN_UP.CREATED,
            data: user
          })

          }catch (error) {
          next(error);
        }
      };

    //로그인
    login = async (req, res, next) => {
      try {
          // 작성 정보 받아오기
          const { username, password } = req.body;
    
          const loginResult = await this.authService.login({ username, password})

          return res.status(HTTP_STATUS.OK).json({
            status:HTTP_STATUS.OK,
            message:MESSAGES.AUTH.LOGIN.SUCCEED,
            data: loginResult
          })

        }  catch (error) {
           next(error);
        }
    };
}

export default AuthController