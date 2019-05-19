import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import TextInput from '@welld/react-components/lib/TextInput';
import DatePicker from '@welld/react-components/lib/DatePicker';
import Button from '@welld/react-components/lib/Button';

import DevConsole from '../../util/DevConsole';

const initialValues = {
  user: '',
  description: '',
  expenseType: '',
  invoiceDate: new Date(),
  currencyCode: 'CHF',
  amount: 0
};

const validate = values => {
  const requiredFields = [
    'user',
    'description',
    'invoiceDate',
    'currencyCode',
    'amount'
  ];

  const positiveIntegerFields = [
    'amount',
  ];

  const errors = {};

  requiredFields.forEach(field => {
    if (!errors[field] && !values[field]) {
      errors[field] = 'This field is required';
    }
  });

  const POSITIVE_INTEGER_REGEX = /^(0|[1-9][0-9]*)$/;
  positiveIntegerFields.forEach(field => {
    if (!errors[field] && !POSITIVE_INTEGER_REGEX.test(values[field])) {
      errors[field] = 'This must be a positive integer';
    }
  });

  return errors;
};

const TransactionForm = ({ history, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(values, actions) => {
      actions.setSubmitting(true);
      onSubmit(values)
        .finally(() => actions.setSubmitting(false));
    }}
    render={formikProps => (
      <form onSubmit={formikProps.handleSubmit}>
        <div className='flex'>
          <TextInput
            name='user'
            labelType='inside'
            label='Who is the final user ?'
            placeholder='Name and Surname'
            className='mr-5'
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            value={formikProps.values.user}
            required
          />
          <TextInput
            name='description'
            labelType='inside'
            label='Description'
            placeholder='E.g. Devoxx Belgium 2018'
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            value={formikProps.values.description}
            required
          />
        </div>
        <div className='mt-5 flex'>
          <TextInput
            name='expenseType'
            labelType='inside'
            label='Expense type'
            placeholder='Event, conference, book...'
            className='flex-1 mr-5'
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            value={formikProps.values.expenseType}
          />
          <DatePicker
            name='invoiceDate'
            labelType='inside'
            label='Invoice date'
            cancellable
            className='flex-1'
            onDateChange={evt => DevConsole('Date changed', evt)}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            value={formikProps.values.invoiceDate}
            required
          />
        </div>
        <div className='mt-5 flex'>
          <TextInput
            name='amount'
            labelType='inside'
            type='number'
            label='Amount'
            placeholder='0'
            className='flex-grow mr-5'
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            value={formikProps.values.amount}
            required
          />
          <TextInput
            name='currencyCode'
            labelType='inside'
            label='Currency'
            placeholder='CHF'
            className='flex-basis-12'
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            value={formikProps.values.currencyCode}
            required
          />
        </div>
        <div className='mt-5 flex'>
          <Button
            color='danger'
            size='block'
            className='mr-5'
            onClick={() => history.push({ pathname: '/transactions', search: history.location.search })}
          >
            Cancel
          </Button>
          <Button
            color='success'
            size='block'
            style={!formikProps.isValid ? { opacity: '0.5' } : { }}
            onClick={formikProps.handleSubmit}
            disabled={!formikProps.isValid || formikProps.isSubmitting}
          >
            {
              formikProps.isSubmitting
                ? 'Saving...'
                : 'Save'
            }
          </Button>
        </div>
      </form>
    )}
  />
);

TransactionForm.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  onSubmit: PropTypes.func
};

TransactionForm.defaultProps = {
  history: null,
  onSubmit: () => {}
};

export default TransactionForm;
