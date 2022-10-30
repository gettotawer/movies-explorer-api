const routerMovies = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createMovie, getAllMovies, deleteMovieById,
} = require('../controllers/movies');

const regUrl = /^https?:\/\/[-a-zA-Z0-9]{2,256}\.([a-zA-Z/]{2,256})*/;

routerMovies.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regUrl),
    trailerLink: Joi.string().required().regex(regUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(regUrl),
    movieId: Joi.number(),
  }),
}), createMovie);

routerMovies.get('/', getAllMovies);

routerMovies.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovieById);

module.exports = routerMovies;
