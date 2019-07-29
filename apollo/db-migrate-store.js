const { MongoClient } = require('mongodb');
const Bluebird = require('bluebird');

const config = require('./src/config/config');

Bluebird.promisifyAll(MongoClient);

class dbStore {
  constructor() {
    this.url = config.db.host;
    this.mClient = null;
  }

  connect() {
    return MongoClient.connect(this.url, { useNewUrlParser: true })
      .then(client => {
        this.mClient = client;
        return client.db();
      });
  }

  load(fn) {
    return this.connect()
      .then(db => db.collection('migrations').find().toArray())
      .then(data => {
        if (!data.length) { return fn(null, {}) }
        const store = data[0];
        // Check if does not have required properties
        if (!Object
          .prototype
          .hasOwnProperty
          .call(store, 'lastRun')
          || !Object
            .prototype
            .hasOwnProperty
            .call(store, 'migrations')) {
          return fn(new Error('Invalid store file'));
        }
        return fn(null, store);
      })
      .catch(err => console.error('Error has been occurred while loading a migration: ', err));
  }

  save(set, fn) {
    return this.connect()
      .then(db => db.collection('migrations')
        .updateMany({},
          {
            $set: {
              lastRun: set.lastRun,
            },
            $push: {
              migrations: { $each: set.migrations },
            },
          },
          {
            upsert: true,
            multi: true,
          }))
      .then(result => {
        this.mClient.close();
        return fn(null, result);
      })
      .catch(err => console.error('Error has been occurred while updating the migrations collection: ', err));
  }
}

module.exports = dbStore;
