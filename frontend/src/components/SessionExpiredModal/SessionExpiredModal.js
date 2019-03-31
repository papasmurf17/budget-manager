import React, { useContext } from 'react';
import { SessionContext, logout } from '../../api/auth';

const SessionExpiredModal = () => {
  const didSessionExpire = useContext(SessionContext);

  return (
    didSessionExpire
      ? (
        <dialog open>
          Session Expired
          <button type='button' onClick={logout}>Ok</button>
        </dialog>
      )
      : null
  );
};

export default SessionExpiredModal;
