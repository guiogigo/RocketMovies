const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MoviesController {
  async create(req, res) {
    const { title, description, rating } = req.body;
    const { id } = req.params;

    await knex('movies').insert({
      title,
      description,
      rating,
      'user_id': id,
    });

    return res.json();
  }

  async show(req, res) {
    const { id } = req.params;

    const result = await knex('movies').where({'user_id': id});
    return res.json(result);
  }
};

module.exports = MoviesController;