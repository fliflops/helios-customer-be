const Redis = require('redis');
const {redis} = require('./vars')

const client = Redis.createClient({
    socket: {
        host:redis.host,
        port:redis.port
    }
})


module.exports = client


