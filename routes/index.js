const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createMovie, getAllMovies, deleteMovieById,
} = require('../controllers/movies');

const {
  updateUserInformation, getUserInformation,
} = require('../controllers/users');

const regUrl = /^https?:\/\/[-a-zA-Z0-9]{2,256}\.([a-zA-Z/]{2,256})*/;

router.get('users/me', getUserInformation);

router.patch('users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUserInformation);

router.post('movies/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regUrl),
    trailer: Joi.string().required().regex(regUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(regUrl),
    movieId: Joi.string().length(24).hex().required(),
  }),
}), createMovie);

router.get('movies/', getAllMovies);

router.delete('movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovieById);

module.exports = router;
