import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import wait from 'waait';
import { mount } from 'enzyme';
import WithUserProfile, { USER_PROFILE_QUERY } from './WithUserProfile';

const mockProfile = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'john.doe',
  email: 'john.doe@welld.ch',
};

const apolloMock = [
  {
    request: {
      query: USER_PROFILE_QUERY
    },
    result: {
      data: {
        profile: {
          ...mockProfile,
          id: 'profile',
          __typename: 'Profile'
        }
      }
    }
  }
];

describe('WithUserProfile unit tests', () => {
  it('should pass all profile info to render prop', async () => {
    const childMock = jest.fn(() => null);
    const wrapper = mount(
      <MockedProvider
        mocks={apolloMock}
        addTypename={false}
      >
        <WithUserProfile>
          {childMock}
        </WithUserProfile>
      </MockedProvider>
    );

    await wait(10);
    wrapper.update();

    // this is not the right expectation, but @client side queries
    // cannot be tested correctly as of today:
    // https://github.com/apollographql/apollo-client/issues/4532
    // we will watch the issue and update the test case when it is closed
    expect(childMock).toHaveBeenCalled();

    // this would be the right expectation
    // expect(childMock).toHaveBeenCalledWith(mockProfile);
  });
});
