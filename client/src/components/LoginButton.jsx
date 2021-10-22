import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const test = true;


  if (!isAuthenticated) {
    return <button className="login" onClick={() => loginWithRedirect()}>Log in</button>
  } else {
    return <button className="login" onClick={() => logout()}>Log out</button>
  }
}

export default LoginButton;