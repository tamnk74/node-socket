import DotENV from 'dotenv';
import mongoConfig from './database.config';

DotENV.config();
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4000;
const JWT_EXPIRATION_MINUTES = process.env.JWT_EXPIRATION || 3600;
const MONGODB_URI = mongoConfig[env];

export {
  env,
  port,
  JWT_EXPIRATION_MINUTES,
  MONGODB_URI,
};
