const mongoose = require('mongoose');

const config = require('./config');

const env = process.env.NODE_ENV || 'development';
const currentConfig = config[env];

module.exports = () => {
  mongoose.Promise = global.Promise;

  const db = mongoose.connect(currentConfig.db, { useNewUrlParser: true });

  mongoose.connection.on('error', function (err) {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red, err);
  }).on('open', function () {
    console.log('Connection established with MongoDB')
  });

  return db;
};