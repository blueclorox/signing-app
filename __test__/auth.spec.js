import AuthController from '../src/controllers/auth.controller.js';
import AuthService from '../src/services/auth.service.js';
import { HTTP_STATUS } from '../src/constants/http-status.constants.js';
import { jest } from '@jest/globals'
import { JWT_ACCESS_KEY, JWT_REFRESH_KEY } from '../src/constants/env.constants.js';
import jwt from 'jsonwebtoken'

describe('Auth Controller - Login', () => {
  let authController;
  let authService;
  let mockRequest;
  let mockResponse;
  let mockNext;
  
  beforeEach(() => {
    authService = new AuthService();
    authController = new AuthController(authService);

    //DB에 존재하는 유저 정보(로그인 가능)
    mockRequest = {
      body: {
        username: 'JIN HO',
        password: '12341234',
      },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockNext = jest.fn();
  });

  it('로그인 성공시 토큰 반환 테스트', async () => {
    // authController에서 미리 준비된 정보로 로그인 시도
    await authController.login(mockRequest, mockResponse, mockNext);

    // status 응답이 맞게 오는지 테스트
    expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    // 원래 구성대로 token을 제대로 반환하는지 테스트
    expect(mockResponse.json).toHaveBeenCalledWith({
      token: expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      }),
    });
  });

  it('로그인 성공 후 토큰 유효성 검증 테스트', async () => {
    await authController.login(mockRequest, mockResponse, mockNext);
    
    // 응답에서 accessToken과 refreshToken 추출
    // mockResponse.json은 res의 모의 객체
    // .mock.calls는 모의 함수 mockfunction이 호출된 모든 내역을 가지는 배열이다.
    // 따라서 .mock.calls[0][0]은 함수가 처음 호출 됐을때의 정보를 가진다.
    // 첫 호출의 token 객체에서 acc, ref 토큰을 추출해 검증하는 것.
    const { accessToken, refreshToken } = mockResponse.json.mock.calls[0][0].token;

    // acc, ref 토큰 검증
    // 각 토큰에 userid가 포함되어있다면 유효한 것으로 본다.
    // 토큰이 만료됐다면 ExpiredError가 발생하기 때문.
    const decodedAccessToken = jwt.verify(accessToken, JWT_ACCESS_KEY);
    expect(decodedAccessToken).toHaveProperty('userid');

    const decodedRefreshToken = jwt.verify(refreshToken, JWT_REFRESH_KEY);
    expect(decodedRefreshToken).toHaveProperty('userid');
  })

  it('로그인 실패시 에러 반환 테스트', async () => {
    mockRequest.body.username = 'HO JIN'; // 가입되지 않은 유저 이름

    await authController.login(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
      message: '가입되지 않은 유저입니다.',
      status: 404
    }));
  });
});