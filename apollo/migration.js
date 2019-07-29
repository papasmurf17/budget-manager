/* eslint-disable no-console */
const migrate = require('migrate');
const DbStore = require('./db-migrate-store');

migrate.load({
  stateStore: new DbStore()
}, (err, set) => {
  if (err) {
    console.error('Error has been occurred during migration: ', err);
    throw err;
  }
  // console.log('load', set, err);

  set.up(err => {
    if (err) {
      console.error('Error has been occurred during UP migration: ', err);
      process.exit(1);
    }

    console.log('migrations successfully ran');
    process.exit(0);
  });
});
