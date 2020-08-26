const express = require('express');
const MoviesService = require('../services/movies');

const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
} = require('../utils/schemas/movies');
const validationHandler = require('../utils/middleware/validationHandler');

const moviesApi = app => {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesServices = new MoviesService();

  router.get('/', async (req, res, next) => {
    const { tags } = req.query;

    try {
      const movies = await moviesServices.getMovies({ tags });
      // throw new Error('Error getting movies'); // Solo para probar el HandleErrorcls

      res.status(200).json({
        data: movies,
        message: 'movies listed'
      });
    } catch (error) {
      next(error);
    }
  });
  router.get(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;

      try {
        const movies = await moviesServices.getMovie({ movieId });
        res.status(200).json({
          data: movies,
          message: 'movies retrieved'
        });
      } catch (error) {
        next(error);
      }
    }
  );
  router.post(
    '/',
    validationHandler(createMovieSchema),
    async (req, res, next) => {
      const { body: movie } = req;
      try {
        // console.log(`Movie ${JSON.stringify(movie, null, 3)}`);

        const createMovieId = await moviesServices.createMovie({ movie });
        console.log(`Create ID ${createMovieId}`);

        res.status(201).json({
          data: createMovieId,
          message: 'movie created'
        });
      } catch (error) {
        next(error);
      }
    }
  );
  router.put(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async (req, res, next) => {
      const { movieId } = req.params;
      const { body: movie } = req;
      try {
        const updateMovieId = await moviesServices.updateMovie({
          movieId,
          movie
        });
        res.status(200).json({
          data: updateMovieId,
          message: 'movie updated'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    const { boby: movie } = req;
    try {
      const updateMovieId = await moviesServices.patch({
        movieId,
        movie
      });
      res.status(200).json({
        data: updateMovieId,
        message: 'movie updated partially'
      });
    } catch (error) {
      next(error);
    }
  });
  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;
      try {
        const deleteMovieId = await moviesServices.deleteMovie({ movieId });
        res.status(200).json({
          data: deleteMovieId,
          message: 'movie deleted'
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = moviesApi;
