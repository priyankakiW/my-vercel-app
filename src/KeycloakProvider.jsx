import React, { useEffect, useState, createContext, useContext } from 'react';
import keycloak from './keycloak';

const KeycloakContext = createContext(null);

export const useKeycloak = () => useContext(KeycloakContext);

export const KeycloakProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
      redirectUri: import.meta.env.VITE_APP_KEYCLOAK_REDIRECT,
    }).then(authenticated => {
      setInitialized(true);
      setToken(keycloak.token);
    });
  }, []);

  if (!initialized) {
    return <div>Loading authentication...</div>;
  }

  return (
    <KeycloakContext.Provider value={{ keycloak, token }}>
      {children}
    </KeycloakContext.Provider>
  );
}; 