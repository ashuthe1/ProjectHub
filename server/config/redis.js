const Redis = require("redis");
const redisClient = Redis.createClient();
const DEFAULT_EXPIRATION = 3600; // 1 hour

const connectClient = async() => {
    await redisClient.connect();
};
connectClient();

module.exports = {redisClient, DEFAULT_EXPIRATION};