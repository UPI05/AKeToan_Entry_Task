import React from 'react';
import GoogleLogin from 'react-google-login';
import store from '../../../redux/store';
import './index.scss';

export default function HomePage() {
  const handleSuccess = res => {
    console.log('fuck');
  };
  const handleFailure = res => {
    console.log(res);
  };
  return (
    <div className="container">
      <GoogleLogin
        clientId="127203046084-6krqlhs1039ets3r1l8velfsrca33813.apps.googleusercontent.com"
        buttonText="Log in with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy="single_host_origin"
      ></GoogleLogin>
    </div>
  );
}
