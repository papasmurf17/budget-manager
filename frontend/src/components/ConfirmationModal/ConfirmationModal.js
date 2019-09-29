import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@welld/react-components/lib/ModalDialog';
import Button from '@welld/react-components/lib/Button';

const ConfirmationModal = ({ history, onConfirm, title, message }) => (
  <Modal
    open
    defaultCloseButton={false}
    onRequestClose={() => history.push({ pathname: '/transactions', search: history.location.search })}
  >
    <Modal.Header>
      <h2 className='text-4xl'>{title}</h2>
      <p>{message}</p>
    </Modal.Header>
    <div className='mt-5 flex'>
      <Button
        color='white'
        size='block'
        className='mr-5'
        onClick={() => history.push({ pathname: '/transactions', search: history.location.search })}
      >
        No
      </Button>
      <Button
        color='danger'
        size='block'
        onClick={onConfirm}
      >
       Yes
      </Button>
    </div>
  </Modal>
);

ConfirmationModal.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  title: PropTypes.string,
  message: PropTypes.string,
  onConfirm: PropTypes.func
};

ConfirmationModal.defaultProps = {
  history: null,
  title: null,
  message: null,
  onConfirm: () => {}
};

export default ConfirmationModal;
