const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const transactionSchema = new Schema({
  _id: ObjectId,
  amount: String,
  currencyCode: String,
  description: String,
  expenseType: String,
  invoiceDate: Date,
  user: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
