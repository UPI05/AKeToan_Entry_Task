import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import store from '../redux/store';
import { addToken, addUserInfo } from '../redux/actions';
import { get } from '../utils/fetchUtils';

// Utils
import renderRoute from './routes';

// Components
import Header from './components/NavBar';

import './style.scss';

export default function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token') || '';

  const verifyToken = async () => {
    const query = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
    const { error, data } = await get(query, {}, false);
    if (error === -1) {
      return localStorage.clear();
    }
    dispatch(addUserInfo({ name: data.name, email: data.email, imageUrl: data.picture }));
    dispatch(addToken(token));
  };

  if (token) {
    verifyToken();
  }
  return (
    <BrowserRouter>
      <Header />
      {renderRoute()}
    </BrowserRouter>
  );
}
