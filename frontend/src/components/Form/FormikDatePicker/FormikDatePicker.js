import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DatePicker from '@welld/react-components/lib/DatePicker';

class FormikDatePicker extends PureComponent {
  formatDate = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  };

  handleChange = date => {
    const { name, onChange } = this.props;
    const value = this.formatDate(date);

    onChange(name, value);
  };

  handleCancel = () => {
    const { name, onChange } = this.props;
    const value = undefined;
    onChange(name, value);
  };

  render() {
    const { value, ...props } = this.props;

    return (
      <DatePicker
        onDateChange={this.handleChange}
        onCancel={this.handleCancel}
        value={value || undefined}
        {...props}
      />
    );
  }
}

FormikDatePicker.propTypes = {
  name: PropTypes.shape.isRequired,
  value: PropTypes.shape.isRequired,
  onChange: PropTypes.func
};

FormikDatePicker.defaultProps = {
  onChange: () => {}
};

export default FormikDatePicker;
