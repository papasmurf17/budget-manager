const axios = require('axios');
const format = require('date-fns/format');
const debug = require('debug')('bm');
const config = require('../config/config');

// https://api.exchangeratesapi.io/2019-08-21?base=CHF&symbols=EUR
const exchangeUrl = 'https://api.exchangeratesapi.io/';
const defaultCurrency = config.currency;

module.exports = async (amount, currencyCode, invoiceDate) => {
  let priceConverted = {
    value: amount,
    currency: currencyCode
  };

  if (currencyCode !== defaultCurrency) {
    const formattedDate = format(new Date(invoiceDate), 'yyyy-MM-dd');
    debug(`💸 currency convert ${amount} ${currencyCode} to ${defaultCurrency} - date ${formattedDate}`);
    const response = await axios
      .get(`${exchangeUrl}${formattedDate}?base=${currencyCode}&symbols=${defaultCurrency}`);

    const price = response.data.rates[defaultCurrency] * amount;

    debug(`💸 new value [${price} ${defaultCurrency}]`);
    priceConverted = {
      value: price,
      currency: defaultCurrency
    };
  }

  return priceConverted;
};
