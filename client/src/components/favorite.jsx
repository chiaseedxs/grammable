import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const Favorite = () => <div>Favorite</div>;

export default withAuthenticationRequired(Favorite, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});