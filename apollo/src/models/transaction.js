/* eslint-disable func-names */
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

transactionSchema.statics.findTransactions = function (limit = 0) {
  return this.find({})
    .sort({ invoiceDate: 'descending' })
    .limit(limit)
    .exec();
};

transactionSchema.statics.searchTransactions = function (limit = 0, searchTerm) {
  return this.find({})
    .or([{ description: { $regex:  searchTerm, $options: 'i' } }])
    .or([{ reporter: { $regex:  searchTerm, $options: 'i' } }])
    .or([{ user: { $regex:  searchTerm, $options: 'i' } }])
    .or([{ expenseType: { $regex:  searchTerm, $options: 'i' } }])
    .sort({ invoiceDate: 'descending' })
    .limit(limit)
    .exec();
};

transactionSchema.statics.findByInvoiceDateGraterThan = function (startFrom = new Date()) {
  return this.find({ invoiceDate: { $gte: startFrom } })
    .lean()
    .exec();
};

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
