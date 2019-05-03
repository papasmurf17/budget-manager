import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@welld/react-components/lib/ModalDialog';
import TextInput from '@welld/react-components/lib/TextInput';
import DatePicker from '@welld/react-components/lib/DatePicker';
import Button from '@welld/react-components/lib/Button';

import DevConsole from '../../util/DevConsole';

const AddTransactionModal = ({ history }) => (
  <Modal open defaultCloseButton={false}>
    <Modal.Header>
      <h2>Insert <span className='semi-bold'>Transaction</span></h2>
      <p>Event, conference, travel, book, course or other...</p>
    </Modal.Header>
    <div className='flex flex-col'>
      <div className='flex'>
        <TextInput labelType='inside' label='Who is the final user ?' placeholder='Name and Surname' className='mr-5' />
        <TextInput labelType='inside' label='Description' placeholder='E.g. Devoxx Belgium 2018' />
      </div>
      <div className='mt-5 flex'>
        <TextInput
          labelType='inside'
          label='Expense type'
          placeholder='Event, conference, book...'
          className='flex-1 mr-5'
        />
        <DatePicker
          labelType='inside'
          label='Invoice date'
          cancellable
          className='flex-1'
          onDateChange={evt => DevConsole('Date changed', evt)}
        />
      </div>
      <div className='mt-5 flex'>
        <TextInput labelType='inside' type='number' label='Amount' placeholder='0' className='flex-grow mr-5' />
        <TextInput labelType='inside' label='Currency' placeholder='CHF' className='flex-basis-12' />
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
        <Button color='success' size='block'>Save</Button>
      </div>
    </div>
  </Modal>
);

AddTransactionModal.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired })
};

AddTransactionModal.defaultProps = {
  history: null,
};

export default AddTransactionModal;
