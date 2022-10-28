const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  }).then((movieData) => {
    Movie.findById(movieData._id)
      .populate('owner').then((newMovieData) => {
        res.send(newMovieData);
      });
  }).catch((error) => {
    if (error.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные при создании карточки фильма.'));
    }
    return next(error);
  });
};

const getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id }).populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('owner').then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм с указанным _id не найден.'));
      }
      if (movie.owner._id.toString() !== req.user._id) {
        const customErr = new Error('Вы не являетесь пользователем, сохранившим карточку этого фильма.');
        customErr.statusCode = 403;
        return next(customErr);
      }
      return Movie.findByIdAndRemove(req.params.id).populate('owner').then((deletedMovie) => res.send(deletedMovie))
        .catch((error) => {
          if (error.name === 'CastError') {
            return next(new ValidationError('Передан несуществующий _id фильма.'));
          }
          return next(error);
        });
    }).catch(next);
};

module.exports = {
  createMovie,
  getAllMovies,
  deleteMovieById,
};
