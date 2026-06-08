const { createClient } = require("redis");

const redisClient= createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'navyish-wish-direction-52118.db.redis.io',
        port: 10719
    }
});

module.exports = redisClient;