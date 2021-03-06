import * as constants from '../common/constants';

const { OAuth2Client } = require('google-auth-library');
const { AppError } = require('../common/errors/AppError');

exports.validate = async (req, res, next) => {
  try {
    // Getting token and check of it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      return next(new AppError(401, constants.RES_MSG_TOKEN_NOT_FOUND));
    }

    if (!token) {
      return next(new AppError(401, constants.RES_MSG_TOKEN_NOT_FOUND));
    }

    // Verify token
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    // Check user permission here if needed
    const { name, email } = ticket.getPayload();

    // Grant access
    if (process.env.ADMIN_IDENT_EMAILS.split('/').includes(email)) {
      req.isAdmin = true;
    } else {
      req.isAdmin = false;
    }
    return next();
  } catch (error) {
    return next(new AppError(500, error.message));
  }
};
