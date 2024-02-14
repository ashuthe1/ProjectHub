const redisClient = require("../config/redisClient");
const generateRedisKey = require("../utils/generateRedisKey");

const isCached = async (req, res, next) => {
    const key = await generateRedisKey(req.originalUrl);
    console.log(`Checking cache for key: ${key}`);

    const isCached = await redisClient.get(key);
    if (isCached) {
        console.log(`Cache Hit! Returning cached data.`);
        return res.status(200).send(JSON.parse(isCached));
    }
    console.log("Cache Miss! Fetching data from database.");
    next();
};

module.exports = isCached;
