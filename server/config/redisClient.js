const {Redis} = require('ioredis');

const REDIS_URL = process.env.REDIS_URL || "redis://default:6379";
const redisClient = new Redis(REDIS_URL);

module.exports = redisClient;