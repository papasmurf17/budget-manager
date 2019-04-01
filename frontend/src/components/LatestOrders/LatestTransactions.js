import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import distanceInWords from 'date-fns/distance_in_words';

import './LatestTransactions.scss';

const LatestTransactions = ({ transactions }) => (
  <ul className='list-reset list-view'>
    {
      transactions.length
        ? (
          transactions.map(({ id, invoiceDate, description, user, reporter, amount, currencyCode }) => (
            <li className='item padding-15' key={id}>
              <div className='inline m-l-15'>
                <p className='recipients no-margin hint-text small'>{reporter}</p>
                <p className='subject no-margin'>{`${description} requested by ${user}`}</p>
                <p className={classnames('font-bold', { 'text-success': amount > 0, 'text-danger': amount < 0 })}>
                  {`${currencyCode} ${amount} `}
                </p>
              </div>
              <div className='datetime'>{distanceInWords(new Date(), new Date(invoiceDate))}</div>
            </li>
          ))
        )
        : 'There are no existing transactions'
    }
  </ul>
);

LatestTransactions.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  )
};

LatestTransactions.defaultProps = {
  transactions: []
};

export default LatestTransactions;
