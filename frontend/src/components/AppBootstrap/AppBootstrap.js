import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import Loading from '../Loading';
import SessionExpiredModal from '../SessionExpiredModal';
import { SessionContext, checkAuthentication, loadUserProfile, login, onAuthExpired } from '../../api/auth';

const AppBootstrap = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isSessionExpired, setSessionExpiration] = useState(false);
  const [hasError, setError] = useState(false);

  const initAuthentication = useCallback(() => {
    const onCheckSuccess = async wasAuthSuccessful => {
      if (!wasAuthSuccessful) {
        login();
      } else {
        await loadUserProfile();
        setAuthenticated(true);
        setSessionExpiration(false);
      }
    };

    checkAuthentication()
      .then(onCheckSuccess)
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    initAuthentication();
    onAuthExpired(() => setSessionExpiration(true));
  }, [initAuthentication]);

  const isCheckingAuth = !isAuthenticated && !hasError;
  if (isCheckingAuth) {
    return <Loading />;
  }

  if (hasError) {
    return <button type='button' onClick={initAuthentication}>Retry</button>;
  }

  return (
    <Router>
      <SessionContext.Provider value={isSessionExpired}>
        <App />
        <SessionExpiredModal />
      </SessionContext.Provider>
    </Router>
  );
};

export default AppBootstrap;
