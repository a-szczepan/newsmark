import React, { PropsWithChildren } from 'react';
import { getGoogleOAuthURL } from '../../utils/auth';

const Login: React.FC<PropsWithChildren> = (props: any) => {
  const oauthGoogleClientId =
    '864694712401-kc0gt2jefs65rmvjn001v1rfma9cfbke.apps.googleusercontent.com';
  const oauthGoogleRedirect = 'http://localhost:5000/api/sessions/oauth/google';
  const serverEndpoint = 'http://localhost:5000';

  return (
    <div style={{ marginTop: '100px' }}>
      <a href={getGoogleOAuthURL()}>Login</a>
    </div>
  );
};

export default Login;
