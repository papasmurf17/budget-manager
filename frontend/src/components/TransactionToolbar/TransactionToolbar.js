import React from 'react';
import PropTypes from 'prop-types';
import Button from '@welld/react-components/lib/Button';
import Icon from '@welld/react-components/lib/Icon';
import ButtonGroup from '@welld/react-components/lib/ButtonGroup';

import HasUserRole from '../HasUserRole';
import DevConsole from '../../util/DevConsole';

const TransactionToolbar = ({ history, id }) => (
  <ButtonGroup color='success' size='tiny'>
    <Button onClick={() => history.push(`/transactions/edit/${id}`)}>
      <Icon name='pencil' />
    </Button>
    <Button onClick={() => DevConsole.log('delete')} className='opacity-25 cursor-not-allowed'>
      <Icon name='trash' />
    </Button>
    <Button onClick={() => DevConsole.log('clone')} className='opacity-25 cursor-not-allowed'>
      <Icon name='clone' />
    </Button>
  </ButtonGroup>
);

TransactionToolbar.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  id: PropTypes.string.isRequired
};

TransactionToolbar.defaultProps = {
  history: null,
};

export default HasUserRole(TransactionToolbar, 'edit');
