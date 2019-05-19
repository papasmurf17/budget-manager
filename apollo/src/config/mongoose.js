const mongoose = require('mongoose');
const debug = require('debug')('bm');

const config = require('./config');

const connectionOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  bufferMaxEntries: 0, // Disable commands buffering
  autoReconnect: true,
  bufferCommands: false, // Disable commands buffering
  connectTimeoutMS: 10000,
  socketTimeoutMS: 10000
};

const connect = (url, options) => mongoose.connect(url, options);
mongoose.Promise = global.Promise;
mongoose.set('bufferCommands', false); // https://mongoosejs.com/docs/guide.html#bufferCommands

module.exports = () => {
  if (process.env.NODE_ENV !== 'mock') {
    connect(config.db.host, connectionOptions).then(
      () => { // Connection successful
        mongoose.connection
          .on('connected', () => debug('Connection with MongoDB established'))
          .on('disconnected', () => { debug('Error: Lost connection with MongoDB') });
      },
      err => { // Connection failed
        debug('Error: Could not connect to MongoDB. Did you forget to run `mongod`?\n', err);
        process.kill(process.pid, 'SIGTERM');
      }
    );
  }
};
