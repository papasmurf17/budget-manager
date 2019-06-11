const Transaction = require('../../models/transaction');
const ScalarType = require('./resolverMap');

const findTransactions = (limit = 0) => Transaction.find({})
  .sort({ invoiceDate: 'descending' })
  .limit(limit)
  .exec();

const findTransaction = transactionId => Transaction.findById(transactionId)
  // .lean()
  .exec();

const amountFrom = async (startFrom = new Date()) => {
  const res = await Transaction
    .find({ invoiceDate: { $gte: startFrom } })
    .lean()
    .exec();

  return res
    .map(transaction => parseFloat(transaction.amount))
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
};

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
  Date: ScalarType.Date,
  Query: {
    Transaction: (parent, { id }) => findTransaction(id),
    Transactions: (parent, { limit }) => findTransactions(limit),
    Total: async (parent, { startFrom }) => amountFrom(startFrom),
  },
  Mutation: {
    addTransaction: (parent, { transaction }, context) => addTransaction(
      transaction, `${context.userData.firstName} ${context.userData.lastName}`
    ),
    removeTransaction: (parent, { id }) => removeTransaction(id),
    updateTransaction: (parent, { id, transaction }) => updateTransaction(id, transaction)
  }
};
