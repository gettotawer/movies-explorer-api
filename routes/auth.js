const routerAuth = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { isAuthorizedMiddleware } = require('../middlewares/auth');

const {
  login, createUser,
} = require('../controllers/users');

routerAuth.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

routerAuth.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
}), createUser);

routerAuth.post('/signout', isAuthorizedMiddleware, (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  }).send({ message: 'Выход' });
});

module.exports = routerAuth;
