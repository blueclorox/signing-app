import express from 'express'
import { AuthController } from '../controllers/auth.controller.js'

const authRouter = express.Router()
const authController = new AuthController();

/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: "회원가입 API"
 *     description: "회원가입 API"
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "JIN HO"
 *               password:
 *                 type: string
 *                 example: "12341234"
 *               nickname:
 *                 type: string
 *                 example: "Mentos"
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: "JIN HO"
 *                 nickname:
 *                   type: string
 *                   example: "Mentos"
 *                 authorities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       authorityName:
 *                         type: string
 *                         example: "ROLE_USER"
 *       400:
 *         description: 입력 값 오류
 *       409:
 *         description: 이미 가입된 사용자(충돌)
 */
authRouter.post('/sign-up', authController.signUp);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: "로그인 API"
 *     description: "로그인 API"
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "JIN HO"
 *               password:
 *                 type: string
 *                 example: "12341234"
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjMsImlhdCI6MTcyODUzNzY4MywiZXhwIjoxNzI4NTQxMjgzfQ.Ewjqkz8yZwUQ0OM9DxScRN42h547_wTotXnIwXuzfvc"
 *       401:
 *         description: 틀린 비밀번호
 *       404:
 *         description: 가입되지 않은 사용자(유저이름 찾을 수 없음)
 */
authRouter.post('/login', authController.login)

export { authRouter }