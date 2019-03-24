const mongoose = require('mongoose');

const { Schema } = mongoose;

// TODO: add reporter
const transactionSchema = new Schema({
  amount: String,
  currencyCode: String,
  description: String,
  expenseType: String,
  invoiceDate: Date,
  user: String,
  reporter: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
