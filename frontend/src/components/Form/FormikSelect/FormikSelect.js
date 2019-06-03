import React from 'react';
import PropTypes from 'prop-types';
import Select from '@welld/react-components/lib/Select';

const FormikSelect = ({ name, onBlur, setFieldValue, ...rest }) => (
  <Select
    {...rest}
    name={name}
    // onBlur is resolved by name since the Select component
    // does not attach name and id to the underlying input.
    onBlur={() => onBlur(name)}
    onChange={option => (
      option
        ? setFieldValue(name, option.value)
        : setFieldValue(name, null))
    }
  />
);

FormikSelect.propTypes = {
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default FormikSelect;
