const unknownRoutes = require('express').Router();
const { isAuthorizedMiddleware } = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

unknownRoutes.all('*', isAuthorizedMiddleware, (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

module.exports = unknownRoutes;
