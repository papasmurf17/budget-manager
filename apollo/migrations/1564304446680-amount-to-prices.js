/* eslint-disable */
const { MongoClient } = require('mongodb');
const Bluebird = require('bluebird');

Bluebird.promisifyAll(MongoClient);
const config = require('../src/config/config');

exports.up = next => {
  let mClient = null;

  return MongoClient
    .connect(config.db.host, { useNewUrlParser: true })
    .then(client => {
      mClient = client;
      return client.db(config.db.name);
    })
    .then(db => new Promise((resolve, reject) => {
      db.collection('transactions')
        .find({})
        .map(transaction => {
          if (!transaction) { return next('All transactions have prices fields') }
          const { amount, currencyCode } = transaction;
          console.log(`Updating ${transaction._id}`);
          return db.collection('transactions').updateOne({
            _id: transaction._id
          }, { $set: {
            'pricePaid': { 'currency': currencyCode, 'value': amount },
            'priceConverted': { 'currency': currencyCode, 'value': amount },
          } }, { upsert: true });
        })
        .toArray()
        .then(promiseArray => Promise.all(promiseArray)
          .then(() => resolve())
          .catch(err => reject(err)))
        .catch(err => reject(err));
    }))
    .then(() => {
      console.log('Amounts and currencies are migrated in the new prices structure!');
      mClient.close();
      return next();
    })
    .catch(err => {
      throw err;
    });
};

exports.down = next => {
  console.log('down');
};
