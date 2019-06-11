const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  amount: mongoose.Types.Decimal128,
  currencyCode: String,
  description: String,
  expenseType: String,
  invoiceDate: Date,
  user: String,
  reporter: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
