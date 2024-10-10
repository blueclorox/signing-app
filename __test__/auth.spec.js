const authController = require('../src/controllers/auth.controller');

describe('Auth 테스트 시나리오', () => {
    describe('회원가입', () => {
      test('회원가입 성공 여부 확인 테스트', async () => {
        const req = { body: {
          username: "JIN HO",
          password: "12341234",
          nickname: "Mentos"
        } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await authController.signUp(req, res);

        const expectedResponse = {
          username: "JIN HO",
          nickname: "Mentos",
          authorities: [
            {
              authorityName: "ROLE_USER",
            },
          ],
        };
  
        // 회원가입이 성공적으로 이루어졌는지 확인
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: '회원가입에 성공했습니다.' }));
      });
  
      test('비밀번호 입력 누락시 반환값 확인 테스트', async () => {
        const req = {  body: {
          username: "JIN HO",
          nickname: "Mentos"
        }  }; // 비밀번호가 누락된 경우
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await authController.signUp(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: '비밀번호를 입력해주세요.' }));
      });

      

      test('이미 가입된 유저 테스트', async () => {
        const req = {  body: {
          username: "JIN HO",
          password: "12341234",
          nickname: "Mentos"
        }  }; // 정상적으로 시도했으나 이미 등록된 username인 경우
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await authController.signUp(req, res);
  
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: '이미 가입된 사용자입니다.' }));
      });
    });
  
    describe('로그인', () => {
      test('로그인 기능 테스트', async () => {
        const req = { body: { username: 'JIN HO', password: '12341234' } }; // 정상적 시도
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await authController.login(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: '로그인에 성공했습니다.' }));
      });
  
      test('비밀번호가 틀렸을 때 반환값 테스트', async () => {
        const req = { body: { username: 'JIN HO', password: 'wrongpass' } }; // 비밀번호가 틀렸을 경우
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await authController.login(req, res);
  
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: '비밀번호가 틀렸습니다.' }));
      });

      test('가입되지 않은 유저 테스트', async () => {
        const req = { body: { username: 'JIN HO', password: '12341234' } }; // 정상적으로 시도했으나 유저 정보가 없는 경우
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await authController.signUp(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: '가입되지 않은 유저입니다.' }));
      });
    });
  });