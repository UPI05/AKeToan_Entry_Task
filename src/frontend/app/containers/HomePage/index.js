import React from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import store from '../../../redux/store';
import { addToken } from '../../../redux/actions';
import './index.scss';

export default function HomePage() {
  // State
  const [refresh, setRefresh] = React.useState(false);
  //
  const handleSuccess = res => {
    localStorage.setItem('token', res.tokenId);
    localStorage.setItem('tokenExpiresAt', res.tokenObj.expires_at);
    store.dispatch(addToken(res.tokenId));
    const refr = !refresh;
    setRefresh(refr);
    alert('Login successfully!');
    console.info(res);
  };
  const handleFailure = res => {
    alert('Login failed!');
  };
  const handleLogout = res => {
    localStorage.clear();
    store.dispatch(addToken(''));
    const refr = !refresh;
    setRefresh(refr);
    alert('Logouted');
  };
  return (
    <div className="container">
      {localStorage.getItem('token') || store.getState().token ? (
        <GoogleLogout
          clientId="127203046084-6krqlhs1039ets3r1l8velfsrca33813.apps.googleusercontent.com"
          buttonText="Log out"
          onLogoutSuccess={handleLogout}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId="127203046084-6krqlhs1039ets3r1l8velfsrca33813.apps.googleusercontent.com"
          buttonText="Log in with Google"
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          cookiePolicy="single_host_origin"
        ></GoogleLogin>
      )}
    </div>
  );
}
