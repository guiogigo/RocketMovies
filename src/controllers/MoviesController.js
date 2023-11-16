const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MoviesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body;
    const { id } = req.params;

    const [movies_id] = await knex('movies').insert({
      title,
      description,
      rating,
      'user_id': id
    });
    console.log(tags);
    const tagsInsert = tags.map(name => {
      return {
        movies_id,
        'user_id': id,
        name
      }
    });

    await knex('moviesTags').insert(tagsInsert); 

    return res.json();
  }

  async index(req, res) {
    const { user_id, title, tags } = req.query;

    let result;

    

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      result = await knex('moviesTags')
        .select([
          "movies.id",
          "movies.title",
          "movies.user_id",
          "movies.description",
          "movies.rating"
        ])
        .where("movies.user_id", user_id)
        .whereLike("movies.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movies", "movies.id", "moviesTags.movies_id")
        .orderBy('movies.title');
    } else {
      result = await knex('movies')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title');
    } 

    const userTags = await knex('moviesTags').where({ user_id });
    const moviesWithTags = result.map(movie => {
      const movieTags = userTags.filter(tag => tag.movies_id === movie.id);
      
      return {
        ...movie,
        tags: movieTags
      }
    });

    return res.json(moviesWithTags);
  }

  async show(req, res) {
    const { id } = req.params

    const movies = await knex('movies').where({ id }).first();
    const tags = await knex('moviesTags').where({movies_id: id}).orderBy('name');

    return res.json({
      ...movies,
      tags,
    })
  }

};

module.exports = MoviesController;