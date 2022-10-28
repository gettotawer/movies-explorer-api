const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUserInformation, getUserInformation,
} = require('../controllers/users');

routerUsers.get('/me', getUserInformation);

routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUserInformation);

module.exports = routerUsers;
