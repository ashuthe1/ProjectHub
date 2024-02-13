const { createClient } = require("redis");

const redisClient = createClient();

async function connect() {
    if (!redisClient.isOpen) {
        await redisClient.connect()
        console.log('Connected to Redis')
    }
}
connect()

module.exports = redisClient;