import DotENV from 'dotenv';
import dbConfig from './database.config'

DotENV.config();
const env = process.env.NODE_ENV || 'development';

module.exports = {
  env,
  port: process.env.PORT || 4000,
  JWT_EXPIRATION_MINUTES: process.env.JWT_EXPIRATION_MINUTES || 3600,
  DB_URL: dbConfig[process.env.NODE_ENV]
};