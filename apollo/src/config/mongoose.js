const mongoose = require('mongoose');
const debug = require('debug')('bm');

const config = require('./config');

const env = process.env.NODE_ENV || 'development';
const currentConfig = config[env];

module.exports = () => {
  if (env !== 'mock') {
    mongoose.Promise = global.Promise;

    const db = mongoose.connect(currentConfig.db, { useNewUrlParser: true });

    mongoose.connection.on('error', err => {
      debug('❌ Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red, err);
    }).on('open', () => {
      debug('⚡️ Connection established with MongoDB');
    });

    return db;
  }
};
