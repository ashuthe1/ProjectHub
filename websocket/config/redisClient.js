const { createClient } = require('redis');

const redisClient = createClient({});

async function connectRedisClient() {
    await redisClient.connect();
};
connectRedisClient();

module.exports = redisClient;