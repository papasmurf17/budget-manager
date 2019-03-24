const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const transactionSchema = new Schema({
  _id: ObjectId,
  amount: Number,
  currencyCode: String,
  description: String,
  expenseType: String,
  invoiceDate: Date,
  user: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
