import React from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../../redux/store';
import { addToken, editItems, addUserInfo } from '../../../redux/actions';

export default function GoogleOAuth() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);

  //
  const handleSuccess = res => {
    localStorage.setItem('token', res.tokenId);
    dispatch(addToken(res.tokenId));
    dispatch(addUserInfo({ name: res.profileObj.name, email: res.profileObj.email, imageUrl: res.profileObj.imageUrl }));
    alert('Login successfully!');
  };
  const handleFailure = res => {
    alert('Login failed!');
  };
  const handleLogout = res => {
    localStorage.clear();
    alert('Logouted');
    dispatch(addUserInfo({}));
    dispatch(editItems([]));
    dispatch(addToken(''));
  };
  return (
    <>
      {token ? (
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
    </>
  );
}
