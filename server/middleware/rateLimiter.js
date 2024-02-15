const redisClient = require("../config/redisClient");

const TTL = 60;
const MAX_REQUESTS = 3;

const rateLimiter = async (req, res, next) => {   
    const userIp = (req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    const key = `rateLimiterIp:${userIp}`;
    console.log(key);
    const requestCount = await redisClient.incr(key);

    var timeLeft;
    if(requestCount === 1) {
        await redisClient.expire(key, TTL);
        timeLeft = TTL;
    }
    else {
        timeLeft = await redisClient.ttl(key);
    }
    if(requestCount > MAX_REQUESTS) {
        return res.status(429).json({message: `Too many requests, please try after ${timeLeft} seconds`});
    }
    next();
};

module.exports = rateLimiter;