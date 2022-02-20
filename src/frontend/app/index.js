import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Utils
import renderRoute from './routes';

// Components
import Header from './components/NavBar';

import './style.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      {renderRoute()}
    </BrowserRouter>
  );
}
