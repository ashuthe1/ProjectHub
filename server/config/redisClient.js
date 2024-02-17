const { createClient } = require('redis');

const redisClient = createClient({
    password: process.env.REDIS_SERVER_PASSWORD,
    socket: {
        host: process.env.REDIS_SERVER_URL,
        port: process.env.REDIS_SERVER_PORT
    }
});

async function connectRedisClient() {
    await redisClient.connect();
};
connectRedisClient();

module.exports = redisClient;