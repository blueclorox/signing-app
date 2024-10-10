import express from 'express'
import { AuthController } from '../controllers/auth.controller.js'

const authRouter = express.Router()
const authController = new AuthController();

//회원가입
authRouter.post('/sign-up', authController.signUp);

//로그인
authRouter.post('/login', authController.login)

export { authRouter }