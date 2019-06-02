import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@welld/react-components/lib/ModalDialog';

import TransactionForm from '../TransactionForm';

const TransactionModal = ({ history, onSubmit, transaction }) => (
  <Modal open defaultCloseButton={false}>
    <Modal.Header>
      <h2>Insert <span className='semi-bold'>Transaction</span></h2>
      <p>Event, conference, travel, book, course or other...</p>
    </Modal.Header>
    <div className='flex flex-col'>
      <TransactionForm history={history} onSubmit={onSubmit} transaction={transaction} />
    </div>
  </Modal>
);

TransactionModal.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  transaction: PropTypes.shape({}),
  onSubmit: PropTypes.func
};

TransactionModal.defaultProps = {
  history: null,
  transaction: null,
  onSubmit: () => {}
};

export default TransactionModal;
