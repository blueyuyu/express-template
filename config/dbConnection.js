// Using Node.js `require()`
const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('connect.connections.host', connect.connections[0].host, connect.connections[0].name);
    } catch (error) {
        console.log('error', error);
        process.exit(1)
    }
}

module.exports = connectDb;