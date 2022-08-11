const redisDB = require('redis');

const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on('connect', () => console.log('redis connected'));
redisClient.on('error', (err) => console.log(err.message));
redisClient.on('ready', () => console.log('redis is ready to use'));
redisClient.on('end', () => console.log('redis closed'));

module.exports = redisClient;
