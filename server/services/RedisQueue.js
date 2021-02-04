import Queue from 'bull';
import redisConfig from '../config/redis.config';

const queue = new Queue('Email Queue', {
  redis: redisConfig,
});
queue.setMaxListeners(10);

export default queue;
