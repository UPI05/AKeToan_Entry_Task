/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import App from './app';
import 'antd/dist/antd.css';
import './index.css';

dotenv.config({ path: '.env' });

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
