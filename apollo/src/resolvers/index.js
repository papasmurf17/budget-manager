const transactionResolver = require('./transaction');
const customScalarResolver = require('./customScalar');


module.exports = [
  customScalarResolver,
  transactionResolver,
];