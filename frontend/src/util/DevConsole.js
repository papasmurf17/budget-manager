/**
 * This is like the standard console but all of its methods do nothing outside of development mode.
 */
const DevConsole = new Proxy(console, {
  get: (target, prop) => {
    if (typeof target[prop] !== 'function') {
      return target[prop];
    }
    return (process.env.NODE_ENV === 'development')
      ? target[prop]
      : () => {};
  }
});

export default DevConsole;
