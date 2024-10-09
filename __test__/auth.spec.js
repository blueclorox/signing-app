const authController = require('../src/controllers/auth.controller');

describe('Auth 테스트 시나리오', () => {
    describe('회원가입', () => {
      test('회원가입 성공 여부 확인 테스트', async () => {
        // 가짜 데이터와 모의 함수 설정
        const req = { body: { username: 'testuser', password: 'testpass' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        // 회원가입 함수 실행
        await authController.signUp(req, res);
  
        // 회원가입이 성공적으로 이루어졌는지 확인
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: '회원가입에 성공했습니다.' }));
      });
  
      test('입력 누락시 반환값 확인 테스트', async () => {
        const req = { body: { username: 'testuser' } }; // 비밀번호가 누락된 경우
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await authController.signUp(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: '비밀번호가 입력되지 않았습니다.' }));
      });
    });
  
    describe('로그인', () => {
      test('로그인 기능 테스트', async () => {
        const req = { body: { username: 'testuser', password: 'testpass' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await authController.login(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
      });
  
      test('비밀번호가 틀렸을 때 반환값 테스트', async () => {
        const req = { body: { username: 'testuser', password: 'wrongpass' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await authController.login(req, res);
  
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: '비밀번호가 틀렸습니다.' }));
      });
    });
  });