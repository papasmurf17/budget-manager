/* eslint-disable import/first */
jest.mock('../../api/apollo', () => jest.fn());
import React from 'react';
import renderer from 'react-test-renderer';
import { SessionContext } from '../../api/auth';
import SessionExpiredModal from './SessionExpiredModal';

describe('Session expiration modal tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it.only('should render nothing when the session is valid', () => {
    const container = renderer.create(
      <SessionContext.Provider value={false}>
        <SessionExpiredModal />
      </SessionContext.Provider>
    );

    expect(container.toJSON()).toBeNull();
  });

  it.only('should render a dialog when the session is expired', () => {
    const container = renderer.create(
      <SessionContext.Provider value>
        <SessionExpiredModal />
      </SessionContext.Provider>
    );

    expect(container.toJSON().type).toBe('dialog');
  });
});
