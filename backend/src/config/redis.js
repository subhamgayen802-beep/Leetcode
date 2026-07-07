const { createClient } = require("redis");

<<<<<<< HEAD
const redisClientclient = createClient({
    username: 'default',
    password:process.env.REDIS_PASSWORD,
=======
const redisClient= createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
    socket: {
        host: 'navyish-wish-direction-52118.db.redis.io',
        port: 10719
    }
});

<<<<<<< HEAD
module.exports = redisClientclient;
=======
module.exports = redisClient;
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
