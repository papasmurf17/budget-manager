const { combineResolvers } = require('graphql-resolvers');
const { canEdit, canDelete } = require('./authorization');
const Transaction = require('../models/transaction');
const { Date: DateMapper, Transaction: TransactionMapper } = require('./customScalar');
const config = require('../config/config');
const currencyConverter = require('../util/currencyConverter');

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
    DefaultCurrency: () => config.currency,
    Transaction: async (parent, { id }, { models }) => TransactionMapper(await models.transaction.findById(id)),
    Transactions: (parent, { limit }, { models }) => models.transaction.findTransactions(limit),
    SearchTransactions:
      (parent, { limit, searchTerm }, { models }) => models.transaction.searchTransactions(limit, searchTerm),
    Total: async (parent, { startFrom }, { models }) => {
      const transactions = await models.transaction.findByInvoiceDateGraterThan(startFrom);

      return transactions
        .map(transaction => parseFloat(transaction.priceConverted.value))
        .reduce((a, b) => a + b, 0)
        .toFixed(2);
    },
  },
  Mutation: {
    addTransaction: combineResolvers(
      canEdit,
      (parent, { transaction }, { me }) => addTransaction(
        transaction, `${me.firstName} ${me.lastName}`
      )
    ),
    removeTransaction: combineResolvers(
      canDelete,
      (parent, { id }) => removeTransaction(id)
    ),
    updateTransaction: combineResolvers(
      canEdit,
      (parent, { id, transaction }) => updateTransaction(id, transaction)
    )
  }
};
