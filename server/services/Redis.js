import Redis from 'ioredis';
import redisConfig from '../config/redis.config';

const redis = new Redis(redisConfig);

export default redis;