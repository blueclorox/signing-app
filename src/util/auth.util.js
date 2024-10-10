import jwt from 'jsonwebtoken';
import { JWT_ACCESS_KEY, JWT_REFRESH_KEY } from '../constants/env.constants.js';
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '../constants/auth.constants.js';

// Access Token을 생성하는 함수
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_ACCESS_KEY, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
};

// Refresh Token을 생성하는 함수
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_KEY, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
};

// Access Token을 검증하는 함수
export const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_ACCESS_KEY);
};

// Refresh Token을 검증하는 함수
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_KEY);
};