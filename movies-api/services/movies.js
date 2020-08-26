// const { moviesMock } = require('../utils/mocks/movies');

const MongoLib = require('../lib/mongo');

class MoviesService {
  constructor() {
    this.collection = 'movies';
    this.mongoDB = new MongoLib();
  }
  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    // const movies = await Promise.resolve(moviesMock);
    const movies = await this.mongoDB.getAll(this.collection, query);
    return movies || [];
  }

  async getMovie({ movieId }) {
    // const movie = await Promise.resolve(moviesMock[0]);
    const movie = await this.mongoDB.get(this.collection, movieId);
    return movie || {};
  }
  async createMovie({ movie }) {
    // const createdMovie = await Promise.resolve(moviesMock[0].id);
    const createdMovie = await this.mongoDB.create(this.collection, movie);
    return createdMovie;
  }
  async updateMovie({ movieId, movie } = {}) {
    // const updatedMovie = await Promise.resolve(moviesMock[0].id);
    const updatedMovie = await this.mongoDB.update(
      this.collection,
      movieId,
      movie
    );
    return updatedMovie;
  }
  // async patchMovie() {
  //   const pathedMovie = await Promise.resolve(moviesMock[0].id);
  //   return pathedMovie;
  // }
  async deleteMovie({ movieId }) {
    // const deletedMovie = await Promise.resolve(moviesMock[0].id);
    const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
    return deletedMovieId;
  }
}

module.exports = MoviesService;
