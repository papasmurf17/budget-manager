const mongoose = require('mongoose');

const { Schema, Number } = mongoose;

const priceSchema = new Schema({
  value: Number,
  currency: String
});

const transactionSchema = new Schema({
  pricePaid: priceSchema,
  priceConverted: priceSchema,
  amount: Number,
  currencyCode: String,
  description: String,
  expenseType: String,
  invoiceDate: Date,
  user: String,
  reporter: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
