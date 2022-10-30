const mainRouter = require('express').Router();
const { isAuthorizedMiddleware } = require('../middlewares/auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');

mainRouter.use(require('./auth'));

mainRouter.use('/movies', isAuthorizedMiddleware, routerMovies);
mainRouter.use('/users', isAuthorizedMiddleware, routerUsers);
mainRouter.use(require('./unknownRoutes'));

module.exports = mainRouter;
