export const MESSAGES = {
    COMMON:{
        INTERNAL_SERVER_ERROR:'예기치 않은 오류가 발생했습니다.'
    },
    AUTH: {
        SIGN_UP:{
            CREATED: '회원가입에 성공했습니다.',
            BAD_REQUEST: '비밀번호를 입력해주세요.',
            CONFLICT: '이미 가입된 사용자입니다.'
        },
        LOGIN:{
            SUCCEED: '로그인에 성공했습니다.',
            UNAUTHORIZED: '비밀번호가 틀렸습니다.',
            NOT_FOUND: '가입되지 않은 유저입니다.'
        },
        JWT:{
            EXPIRED: '인증이 만료되었습니다.',
            INVALID: '인증이 유효하지 않습니다.',
            NO_TOKEN: '인증 정보가 없습니다.',
            NOT_SUPPORTED_TYPE: '지원하지 않는 인증 방식입니다.',
            NO_USER: '인증 정보와 일치하는 사용자가 없습니다.',
        }
    }
}