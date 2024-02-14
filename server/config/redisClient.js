const {Redis} = require('ioredis');

const clientRedis = new Redis();

module.exports = clientRedis;