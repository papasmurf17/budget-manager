const Transaction = require('../../models/transaction');

const findTransactions = (limit = 0) => Transaction.find({})
  .sort({ invoiceDate: 'descending' })
  .limit(limit)
  .exec();

const findTransaction = transactionId => Transaction.findById(transactionId)
  // .lean()
  .exec();

const addTransaction = (transaction, reporter) => new Transaction({
  amount: transaction.amount,
  currencyCode: transaction.currencyCode,
  description: transaction.description,
  expenseType: transaction.expenseType,
  invoiceDate: transaction.invoiceDate,
  user: transaction.user,
  reporter
}).save();

const removeTransaction = transactionId => Transaction.findOneAndDelete({ _id: transactionId });

const updateTransaction = (transactionId, transaction) => Transaction.findOneAndUpdate({
  _id: transactionId
}, {
  amount: transaction.amount,
  currencyCode: transaction.currencyCode,
  description: transaction.description,
  expenseType: transaction.expenseType,
  invoiceDate: transaction.invoiceDate,
  user: transaction.user,
}, {
  new: true,
  omitUndefined: true
});

module.exports = {
  Query: {
    Transaction: (parent, { id }) => findTransaction(id),
    Transactions: (parent, { limit }) => findTransactions(limit),
  },
  Mutation: {
    addTransaction: (parent, { transaction }, context) => addTransaction(
      transaction, `${context.userData.firstName} ${context.userData.lastName}`
    ),
    removeTransaction: (parent, { id }) => removeTransaction(id),
    updateTransaction: (parent, { id, transaction }) => updateTransaction(id, transaction)
  }
};
