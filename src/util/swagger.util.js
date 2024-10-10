import swaggerJsdoc from 'swagger-jsdoc';
import { CURRENT_SERVER_URL } from '../constants/env.constants.js';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Signing-App',
      version: '1.0.0',
      description: '회원가입 및 로그인 API',
    },
    servers: [
      {
        url: CURRENT_SERVER_URL, // 서버 URL
      },
    ],
  },
  apis: ['./src/routers/*.js'], // API 라우터가 정의된 파일 경로
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export default swaggerSpecs;