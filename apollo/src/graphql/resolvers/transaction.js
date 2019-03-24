const Transaction = require('../../models/transaction');

module.exports = {
  Query: {
    Transactions: async () => await Transaction.find({}).exec()
  }
};
