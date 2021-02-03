import dotenv from 'dotenv';
dotenv.config();

export const env = process.env.NODE_ENV || 'development';
export const port = process.env.NODE_ENV || '4000';
export const JWT_EXPIRE = process.env.JWT_EXPIRE || 3600;