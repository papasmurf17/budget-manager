import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@welld/react-components/lib/ModalDialog';

import TransactionForm from '../TransactionForm';

const AddTransactionModal = ({ history, onSubmit }) => (
  <Modal open defaultCloseButton={false}>
    <Modal.Header>
      <h2>Insert <span className='semi-bold'>Transaction</span></h2>
      <p>Event, conference, travel, book, course or other...</p>
    </Modal.Header>
    <div className='flex flex-col'>
      <TransactionForm history={history} onSubmit={onSubmit} />
    </div>
  </Modal>
);

AddTransactionModal.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  onSubmit: PropTypes.func
};

AddTransactionModal.defaultProps = {
  history: null,
  onSubmit: () => {}
};

export default AddTransactionModal;
