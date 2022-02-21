import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store';
import { addToken } from '../redux/actions';

// Utils
import renderRoute from './routes';

// Components
import Header from './components/NavBar';

import './style.scss';

export default function App() {
  const token = localStorage.getItem('token') || '';
  if (token) store.dispatch(addToken(token));
  return (
    <BrowserRouter>
      <Header />
      {renderRoute()}
    </BrowserRouter>
  );
}
