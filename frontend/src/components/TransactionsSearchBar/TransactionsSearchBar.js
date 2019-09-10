import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextInput from '@welld/react-components/lib/TextInput';

import useDebounce from '../../hooks/use-debounced';

const TransactionsSearchBar = ({ onChange, initValue, ...props }) => {
  const [searchTerm, setSearchTerm] = useState(initValue);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        onChange(debouncedSearchTerm);
      }
    },
    [debouncedSearchTerm, onChange]
  );

  return (
    <>
      <TextInput
        name='transaction-searchbar'
        placeholder='Search a transaction'
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
        {...props}
      />
    </>
  );
};

TransactionsSearchBar.propTypes = {
  onChange: PropTypes.func,
  initValue: PropTypes.string,
};

TransactionsSearchBar.defaultProps = {
  onChange: val => console.log('onChange', val),
  initValue: '',
};

export default TransactionsSearchBar;
