const postcssPresetEnv = require('postcss-preset-env');
const tailwindcss = require('tailwindcss');
const importcss = require('postcss-import');

module.exports = {
  style: {
    postcss: {
      plugins: [
        importcss({ filter: importPath => importPath.endsWith('tailwind.css') }),
        tailwindcss('./tailwind.config.js'),
        postcssPresetEnv({
          stage: 0,
          features: {
            'color-mod-function': {},
          },
        })
      ]
    }
  },
  jest: {
    configure: jestConfig => ({
      ...jestConfig,
      setupFiles: ['./setupTests.js'],
      testResultsProcessor: 'jest-sonar-reporter',
      coverageReporters: ['text-summary', 'lcov'],
      collectCoverage: true,
      collectCoverageFrom: [
        'src/**/*.{js,jsx,mjs}'
      ],
      testURL: 'http://localhost',
      testPathIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
      ],
      transformIgnorePatterns: [
        '/node_modules/(?!(@babel/runtime)/).*\\.(?!css)'
      ]
    }),
  },
};
