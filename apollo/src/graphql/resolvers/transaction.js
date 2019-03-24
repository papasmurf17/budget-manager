const Transaction = require('../../models/transaction');

const findTransactions = (limit = 0) => Transaction.find({})
  .sort({ invoiceDate: 'descending' })
  .limit(limit)
  .exec();

const findTransaction = id => Transaction.findById(id)
  // .lean()
  .exec();

module.exports = {
  Query: {
    Transaction: (parent, { id }) => findTransaction(id),
    Transactions: (parent, { limit }) => findTransactions(limit),
  },
  // Mutation: {}
};
