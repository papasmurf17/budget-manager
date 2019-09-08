const Transaction = require('../models/transaction');
const { Date: DateMapper, Transaction: TransactionMapper } = require('./customScalar');
const config = require('../config/config');
const currencyConverter = require('../util/currencyConverter');

const findTransactions = (limit = 0) => Transaction.find({})
  .sort({ invoiceDate: 'descending' })
  .limit(limit)
  .exec();

const findTransaction = async transactionId => {
  const transaction = await Transaction.findById(transactionId)
    // .lean()
    .exec();

  return TransactionMapper(transaction);
};

const defaultCurrency = () => config.currency;

const amountFrom = async (startFrom = new Date()) => {
  const res = await Transaction
    .find({ invoiceDate: { $gte: startFrom } })
    .lean()
    .exec();

  return res
    .map(transaction => parseFloat(transaction.priceConverted.value))
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
};

const addTransaction = async (transaction, reporter) => {
  const priceConverted = await currencyConverter(transaction.amount, transaction.currencyCode, transaction.invoiceDate);

  return TransactionMapper(await new Transaction({
    pricePaid: {
      value: transaction.amount,
      currency: transaction.currencyCode
    },
    priceConverted,
    description: transaction.description,
    expenseType: transaction.expenseType,
    invoiceDate: transaction.invoiceDate,
    user: transaction.user,
    reporter
  }).save());
};

const removeTransaction = transactionId => Transaction.findOneAndDelete({ _id: transactionId });

const updateTransaction = async (transactionId, transaction) => {
  const priceConverted = await currencyConverter(transaction.amount, transaction.currencyCode, transaction.invoiceDate);
  return TransactionMapper(await Transaction.findOneAndUpdate({
    _id: transactionId
  }, {
    pricePaid: {
      value: transaction.amount,
      currency: transaction.currencyCode
    },
    priceConverted,
    description: transaction.description,
    expenseType: transaction.expenseType,
    invoiceDate: transaction.invoiceDate,
    user: transaction.user,
  }, {
    new: true,
    omitUndefined: true
  }));
};

module.exports = {
  Date: DateMapper,
  Query: {
    DefaultCurrency: () => defaultCurrency(),
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
