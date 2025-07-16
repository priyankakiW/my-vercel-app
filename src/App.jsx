import React from 'react';
import { useKeycloak } from './KeycloakProvider.jsx';

function App() {
  const { keycloak, token } = useKeycloak();

  if (!keycloak || !keycloak.authenticated) {
    return <div>Loading user info...</div>;
  }

  const user = keycloak.tokenParsed || {};
  const realm = import.meta.env.VITE_APP_KEYCLOAK_REALM;
  const clientId = import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Hello, {user.preferred_username || user.name || 'User'}!</h1>
      <p>Email: {user.email || 'N/A'}</p>
      <p>Roles: {(user.realm_access && user.realm_access.roles && user.realm_access.roles.join(', ')) || 'None'}</p>
      <p>Tenant (Realm): {realm}</p>
      <p>Client ID: {clientId}</p>
      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  );
}

export default App;
