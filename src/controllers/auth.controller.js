import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { MESSAGES } from "../constants/message.constants.js";
import AuthService from "../services/auth.service.js";

export class AuthController{   
    constructor(authService = new AuthService()){
        this.authService = authService
    };

    //회원가입
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
            // 원래 작성 해뒀지만 원하는 값이 존재하는 듯 하여 주석 처리 해두었습니다.
            // status:HTTP_STATUS.CREATED,
            // message:MESSAGES.AUTH.SIGN_UP.CREATED,
            // data: user
            user
          })
          }catch (error) {
          return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
          });
        }
      };

    //로그인
    login = async (req, res, next) => {
      try {
          // 작성 정보 받아오기
          const { username, password } = req.body;
    
          const loginResult = await this.authService.login({ username, password})

          return res.status(HTTP_STATUS.OK).json({
            // status:HTTP_STATUS.OK,
            // message:MESSAGES.AUTH.LOGIN.SUCCEED,
            // data: loginResult
            token: loginResult
          })
        }  catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
              });
        }
    };
}

export default AuthController