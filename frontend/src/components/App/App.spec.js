import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { shallow } from 'enzyme';
import App from './App';

describe('App unit tests', () => {
  it('renders without crashing', () => {
    shallow(
      <MockedProvider mocks={[]}>
        <App />
      </MockedProvider>
    );
  });
});
