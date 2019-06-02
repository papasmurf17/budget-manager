import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import classnames from 'classnames';
import distanceInWords from 'date-fns/distance_in_words';
import Typeahead from '@welld/react-components/lib/Typeahead';
import Button from '@welld/react-components/lib/Button';
import Icon from '@welld/react-components/lib/Icon';

import './LatestTransactions.scss';

import CreateTransaction from '../CreateTransaction';
import DevConsole from '../../util/DevConsole';

const getAsyncOptions = (input, callback) => {
  const error = null;

  setTimeout(() => {
    callback(error, {
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
      ],
      // Only set this to true when there are no more options,
      // or more specific queries will not be sent to the server.
      complete: true
    });
  }, 2000);
};

const LatestTransactions = ({ transactions, history }) => (
  <>
    <div className='flex items-end'>
      <Typeahead
        value=''
        onChange={evt => DevConsole.log(evt)}
        loadOptions={getAsyncOptions}
        label='search a transaction'
        labelHelp='you can search by: description, user, amount and reporter'
        className='flex-grow m-r-5'
      />
      <Button
        color='success'
        size='small'
        className='flex-none'
        onClick={() => history.push({ pathname: '/transactions/new', search: history.location.search })}
      >
        <Icon name='plus' size='small' />
      </Button>
      <Route
        path='/transactions/new'
        render={
          props => (
            <CreateTransaction
              {...props}
            />
          )
        }
      />
    </div>
    <hr />
    <ul className='list-reset list-view'>
      {
        transactions.length
          ? (
            transactions.map(({ _id, invoiceDate, description, user, reporter, amount, currencyCode }) => (
              <li className='item padding-15' key={_id}>
                <div className='inline m-l-15'>
                  <p className='recipients no-margin hint-text small'>{reporter}</p>
                  <p className='subject no-margin'>{`${description}`}</p>
                  <p className={classnames('font-bold', { 'text-success': amount > 0, 'text-danger': amount < 0 })}>
                    {`${currencyCode} ${amount} `}
                  </p>
                </div>
                <div className='datetime'>
                  Requested by <b>{user}</b>, {distanceInWords(new Date(), new Date(invoiceDate))}
                </div>
              </li>
            ))
          )
          : 'There are no existing transactions'
      }
    </ul>
  </>
);

LatestTransactions.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired
    })
  )
};

LatestTransactions.defaultProps = {
  transactions: [],
  history: null,
};

export default LatestTransactions;
