const ofTypeOrNullRequired = type => (props, propName, componentName, ...rest) => {
  if (props[propName] === undefined) {
    const errorMessage = `The prop \`${propName}\` is marked as required in \`${componentName}\`,`
      + ' but its value is `undefined.';
    return new Error(errorMessage);
  }
  /* eslint-disable-next-line no-use-before-define */
  return ofTypeOrNull(type)(props, propName, componentName, ...rest);
};

/**
 * Custom prop type to accept null values
 *
 * @param type
 * @returns {function(*=, *=, *=, ...[*]): *}
 */
const ofTypeOrNull = type => {
  const inner = (props, propName, componentName, ...rest) => {
    if (props[propName] === null) {
      return;
    }
    return type(props, propName, componentName, ...rest);
  };
  inner.isRequired = ofTypeOrNullRequired(type);
  return inner;
};

export default ofTypeOrNull;
