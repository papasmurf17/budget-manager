module.exports = {
  jest: {
    configure: jestConfig => ({
      ...jestConfig,
      preset: 'jest-puppeteer',
    })
  }
};
