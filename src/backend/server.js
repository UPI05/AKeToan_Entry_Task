import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from 'morgan';
import expressValidator from 'express-validator';

import pkg from '../../package.json';

const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');
const api = require('./api');

dotenv.config({ path: '.env' });

const app = express();

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const webpack = require('webpack');

  // eslint-disable-next-line global-require
  const webpackDevMiddleware = require('webpack-dev-middleware');
  // eslint-disable-next-line global-require
  const webpackHotMiddleware = require('webpack-hot-middleware');

  // eslint-disable-next-line global-require
  const webpackConfig = require('../../webpack.config');

  const compiler = webpack(webpackConfig[1]);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: '/',
    }),
  );
  app.use(webpackHotMiddleware(compiler));
}

app.use(compression());
app.use(logger(process.env.NODE_ENV === 'production' ? 'production' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static('public'));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

app.use('/api/v1', api);

app.use((err, req, res, next) => {
  let { statusCode, message } = err;

  statusCode = statusCode || 500;
  message = message || '';

  res.status(statusCode).json({
    statusCode,
    message,
  });
});

app.get('*', async (req, res) => {
  res.status(200).end(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,shrink-to-fit=no"
          />
          <meta
            name="description"
            content="AKeToan"
          />
          <meta name="author" content="AKeToan Entry Test Project" />
          <meta name="msapplication-TileColor" content="#0dffff" />
          <meta name="theme-color" content="#ffffff" />
          <title>AKeToan Entry Project</title>
          <link rel="manifest" href="public/manifest.json" />
          <link rel="mask-icon" href="public/safari-pinned-tab.svg" />
          <link rel="shortcut icon" href="public/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="public/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="public/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="public/favicon-16x16.png" />
          <script type="text/javascript">
            window.REACT_APP_API_URL = 'https://localhost:3000';
          </script>
        </head>
        <body>
          <div id="app"></div>
          <script type="text/javascript" src="/app.js?v=${pkg.version}"></script>
        </body>
      </html>  
    `);
});

export default app;
