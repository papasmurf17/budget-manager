import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@welld/react-components/lib/Icon';

const Error = ({ message, icon }) => (
  <div className='flex h-full'>
    <div className='m-auto text-center text-red-500'>
      <h2 className='inline-block text-5xl text-red-500 mr-2'>{message}</h2>
      <Icon className='inline-block' name={icon} size='big' />
    </div>
  </div>
);

Error.propTypes = {
  message: PropTypes.string,
  icon: PropTypes.string
};

Error.defaultProps = {
  message: 'Error',
  icon: 'exclamation'
};

export default Error;
