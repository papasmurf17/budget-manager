import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '@welld/react-components/lib/Spinner';

const Loading = ({ spinnerType }) => (
  <div className='flex h-full'>
    <div className='m-auto text-center text-red-500'>
      <Spinner />
    </div>
  </div>
);

Loading.propTypes = {
  spinnerType: PropTypes.string
};

Loading.defaultProps = {
  spinnerType: 'exclamation'
};

export default Loading;
