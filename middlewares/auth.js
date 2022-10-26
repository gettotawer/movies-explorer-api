const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET } = require('../consts/secret');
const AuthError = require('../errors/authError');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line max-len
const isAuthorizedMiddleware = (req, res, next) => {
  try {
    const payload = jwt.verify(
      req.cookies.jwt,
      NODE_ENV === 'production' ? JWT_SECRET : SECRET,
    );
    User.findOne({ _id: payload._id })
    // eslint-disable-next-line consistent-return
      .then((user) => {
        if (!user) {
          throw new AuthError('Ошибка! Вы не авторизированы.');
        }
        next();
      })
      .catch(next);
    req.user = payload;
  } catch (e) {
    next(new AuthError('Ошибка! Вы не авторизированы.'));
  }
};

module.exports = {
  isAuthorizedMiddleware,
};
