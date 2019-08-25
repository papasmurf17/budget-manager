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
    .then(db => db.collection('transactions')
      .find({ prices: { $exists: false } })
      .forEach(transaction => {
        if (!transaction) { return next('All transactions have prices fields') }
        const { amount, currencyCode } = transaction;
        transaction.pricePaid = { currency: currencyCode, value: amount };
        transaction.priceConverted = {};
        db.collection('transactions').save(transaction);
      }))
    .then(() => {
      mClient.close();
      console.log('Amounts and currencies are migrated in the new prices structure!');
      return next();
    })
    .catch(err => {
      throw err;
    });
};

exports.down = next => {
  console.log('down');
  let mClient = null;
  return MongoClient
    .connect(config.db.host, { useNewUrlParser: true })
    .then(client => {
      mClient = client;
      return client.db(config.db.name);
    })
    .then(db => db.collection('transactions').updateMany(
      {
        amount: { $exists: true }
      },
      {
        $unset: { amount: '' }
      }
    ))
    .then(() => {
      mClient.close();
      return next();
    })
    .catch(err => {
      throw err;
    });
};
