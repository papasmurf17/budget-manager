export default maybePromise => maybePromise && typeof maybePromise.then === 'function';
