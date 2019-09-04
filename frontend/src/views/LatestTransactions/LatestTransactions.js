import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import classnames from 'classnames';
import distanceInWords from 'date-fns/distance_in_words';
import numeral from 'numeral';
import Typeahead from '@welld/react-components/lib/Typeahead';
import Button from '@welld/react-components/lib/Button';
import Icon from '@welld/react-components/lib/Icon';
import Badge from '@welld/react-components/lib/Badge';

import './LatestTransactions.css';

import CreateTransaction from '../CreateTransaction';
import UpdateTransaction from '../UpdateTransaction';
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
    <div className='flex items-end mt-8'>
      <Typeahead
        disabled
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
      <Route
        path='/transactions/edit/:transactionId'
        render={
          props => (
            <UpdateTransaction
              {...props}
            />
          )
        }
      />
    </div>
    <hr />
    <div className='list-view mb-8'>
      {
        transactions.length
          ? (
            transactions.map(({
              _id, invoiceDate, description, user, reporter, pricePaid, priceConverted, expenseType
            }) => (
              <div
                onClick={() => history.push(`/transactions/edit/${_id}`)}
                className='item padding-15 flex'
                key={_id}
                role='button'
                tabIndex={0}
              >
                <div className='flex-1 m-l-15'>
                  <p className='recipients no-margin hint-text text-lg'>{reporter}</p>
                  <p className='subject no-margin'>{`${description}`}</p>
                  <div>
                    <p
                      className={
                        classnames('inline font-bold text-2xl', {
                          'text-success': pricePaid.value > 0, 'text-danger': pricePaid.value < 0
                        })
                      }
                    >
                      { `${numeral(pricePaid.value).format('0,0[.]00')} ${pricePaid.currency}` }
                    </p>
                    {pricePaid.currency === priceConverted.currency ? null : (
                      <p className={classnames('inline ml-3 hint-text')}>
                        { `(${numeral(priceConverted.value).format('0,0[.]00')} ${priceConverted.currency})` }
                      </p>
                    )}
                  </div>
                </div>
                <div className='flex justify-between flex-col'>
                  <p className='text-xl'>
                    {pricePaid.value < 0 ? 'Requested' : 'Provided' } by <b>{user}</b>,
                    {distanceInWords(new Date(), new Date(invoiceDate))}
                  </p>
                  <Badge type='edgy' color='warning' className='self-end'>
                    {expenseType}
                  </Badge>
                </div>
              </div>
            ))
          )
          : 'There are no existing transactions'
      }
    </div>
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
