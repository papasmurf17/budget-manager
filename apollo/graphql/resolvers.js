import Transaction from '../models/transaction';

export default {
  Query: {
    getTransactions: async () => await Transaction.find({}).exec()
  }
};
