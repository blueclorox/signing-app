import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { MESSAGES } from "../constants/message.constants.js";

const errorHandler = (err, req, res, next) => {
    switch (err.name) {
      // JWT verify method에서 발생한 에러 처리
      case 'TokenExpiredError':
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.JWT.EXPIRED,
        });
  
      case 'JsonWebTokenError':
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.JWT.INVALID,
        });
  
      // HttpError와 그 밖의 예상치 못한 에러 처리
      default:
        console.log(err);
        return res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          status: err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
          message: err.message || MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
        });
    }
  };

export default errorHandler