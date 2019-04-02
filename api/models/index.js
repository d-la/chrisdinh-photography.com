const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGO_STRING, {
    keepAlive: true,
    useMongoClient: true
});

module.exports.User = require('./user');