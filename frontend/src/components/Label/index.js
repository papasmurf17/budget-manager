import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Label.css';

const Label = ({ children, className, component: Component }) => (
  <Component className={classnames(className, 'app-label text-black')}>{children}</Component>
);

Label.propTypes = {
  children: PropTypes.elementType,
  className: PropTypes.string,
  component: PropTypes.element
};

Label.defaultProps = {
  children: null,
  className: undefined,
  component: 'p'
};

export default Label;
