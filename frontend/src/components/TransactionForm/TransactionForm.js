import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import TextInput from '@welld/react-components/lib/TextInput';
import Button from '@welld/react-components/lib/Button';

import DatePicker from '../Form/FormikDatePicker';
import FormikSelect from '../Form/FormikSelect';

const initialValues = ({ amount, ...transaction }) => ({
  user: '',
  description: '',
  expenseType: '',
  invoiceDate: new Date(),
  currencyCode: 'CHF',
  amount: amount ? Math.abs(amount) : 0,
  transactionType: amount && amount > 0 ? 'Deposit' : 'Payment',
  ...transaction
});

const validate = values => {
  const requiredFields = [
    'user',
    'description',
    'invoiceDate',
    'currencyCode',
    'amount'
  ];

  const positiveIntegerFields = [
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

const TransactionForm = ({ history, onSubmit, transaction }) => (
  <Formik
    initialValues={initialValues(transaction)}
    validate={validate}
    onSubmit={(values, actions) => {
      actions.setSubmitting(true);
      const updatedValues = {
        ...values,
        amount: values.transactionType === 'Deposit' ? Math.abs(values.amount) : -Math.abs(values.amount)
      };
      onSubmit(updatedValues)
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
            format='DD-MM-YYYY'
            cancellable
            className='flex-1'
            onChange={formikProps.setFieldValue}
            onBlur={formikProps.handleBlur}
            value={formikProps.values.invoiceDate}
            required
          />
        </div>
        <div className='mt-5 flex'>
          <FormikSelect
            name='transactionType'
            labelType='inside'
            label='Transaction Type'
            placeholder='Payment'
            className='flex-basis-6 mr-5'
            onBlur={formikProps.handleBlur}
            value={formikProps.values.transactionType}
            options={[
              { value: 'Payment', label: 'Payment' },
              { value: 'Deposit', label: 'Deposit' },
            ]}
            setFieldValue={formikProps.setFieldValue}
            required
          />
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
          <FormikSelect
            name='currencyCode'
            labelType='inside'
            label='Currency'
            placeholder='CHF'
            className='flex-basis-12'
            onBlur={formikProps.handleBlur}
            value={formikProps.values.currencyCode}
            options={[
              { value: 'CHF', label: 'CHF' },
              { value: 'EUR', label: 'EUR' },
              { value: 'USD', label: 'USD' },
              { value: 'GBP ', label: 'GBP' },
            ]}
            setFieldValue={formikProps.setFieldValue}
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
  onSubmit: PropTypes.func,
  transaction: PropTypes.shape({})
};

TransactionForm.defaultProps = {
  history: null,
  transaction: null,
  onSubmit: () => {}
};

export default TransactionForm;
