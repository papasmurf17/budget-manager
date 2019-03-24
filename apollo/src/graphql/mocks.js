const casual = require('casual');
const { MockList } = require('graphql-tools');

const fakeTransaction = () => ({
  _id: casual.uuid,
  amount: casual.double(1, 100000),
  currencyCode: casual.currency_code,
  description: casual.description,
  expenseType: casual.word,
  invoiceDate: casual.date,
  user: casual.username,
  reporter: casual.username
});

module.exports = {
  Transaction: fakeTransaction,
  Query: () => ({
    transactions: (_, args) => new MockList([0, (args.limit) ? args.limit : 15])
  })
};
