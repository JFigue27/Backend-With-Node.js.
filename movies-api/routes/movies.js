const express = require('express');
const MoviesService = require('../services/movies');

const moviesApi = app => {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesServices = new MoviesService();

  router.get('/', async (req, res, next) => {
    const { tags } = req.query;

    try {
      const movies = await moviesServices.getMovies({ tags });
      res.status(200).json({
        data: movies,
        message: 'movies listed'
      });
    } catch (error) {
      next(error);
    }
  });
  router.get('/:movieId', async (req, res, next) => {
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
  });
  router.post('/', async (req, res, next) => {
    const { boby: movie } = req;
    try {
      const createMovieId = await moviesServices.createMovie({ movie });
      res.status(201).json({
        data: createMovieId,
        message: 'movie created'
      });
    } catch (error) {
      next(error);
    }
  });
  router.put('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    const { boby: movie } = req;
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
  });
  router.patch('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    const { boby: movie } = req;
    try {
      const updateMovieId = await moviesServices.updateMovie({
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
  router.delete('/:movieId', async (req, res, next) => {
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
  });
};

module.exports = moviesApi;
