const Transaction = require('../../models/transaction');

const findTransactions = (limit = 0) => Transaction.find({})
  .sort({ invoiceDate: 'descending' })
  .limit(limit)
  .exec();

const findTransaction = id => Transaction.findById(id)
  // .lean()
  .exec();

const addTransaction = transaction => new Transaction({
  amount: transaction.amount,
  currencyCode: transaction.currencyCode,
  description: transaction.description,
  expenseType: transaction.expenseType,
  invoiceDate: transaction.invoiceDate,
  user: transaction.user,
  reporter: transaction.reporter
}).save();

const removeTransaction = transactionId => Transaction.findOneAndDelete({ _id: transactionId });

module.exports = {
  Query: {
    Transaction: (parent, { id }) => findTransaction(id),
    Transactions: (parent, { limit }) => findTransactions(limit),
  },
  Mutation: {
    addTransaction: (parent, { transaction }) => addTransaction(transaction),
    removeTransaction: (parent, { transactionId }) => removeTransaction(transactionId)
  }
};
