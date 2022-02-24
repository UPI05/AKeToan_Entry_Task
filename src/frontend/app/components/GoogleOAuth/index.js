import React from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import store from '../../../redux/store';
import { addToken, addUserInfo } from '../../../redux/actions';

export default function GoogleOAuth() {
  // State
  const [refresh, setRefresh] = React.useState(false);

  const dispatch = useDispatch();

  //
  const handleSuccess = res => {
    localStorage.setItem('token', res.tokenId);
    dispatch(addToken(res.tokenId));
    dispatch(addUserInfo({ name: res.profileObj.name, email: res.profileObj.email, imageUrl: res.profileObj.imageUrl }));
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
    dispatch(addToken(''));
    dispatch(addUserInfo({}));
    const refr = !refresh;
    setRefresh(refr);
    alert('Logouted');
  };
  return (
    <>
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
    </>
  );
}
