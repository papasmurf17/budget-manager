const mongoose = require('mongoose');

const { Schema, Number } = mongoose;

// TODO: add reporter
const transactionSchema = new Schema({
  amount: Number,
  currencyCode: String,
  description: String,
  expenseType: String,
  invoiceDate: Date,
  user: String,
  reporter: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
