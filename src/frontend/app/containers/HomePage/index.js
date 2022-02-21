import React from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import store from '../../../redux/store';
import './index.scss';

export default function HomePage() {
  const handleSuccess = res => {
    console.log(res.tokenId);
  };
  const handleFailure = res => {
    console.log(res.tokenId);
  };
  const handleLogout = res => {
    alert('logouted');
  };
  return (
    <div className="container">
      {false ? (
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
