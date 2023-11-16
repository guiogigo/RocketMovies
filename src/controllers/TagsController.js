const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class TagsController {
  async show(req, res) {
    const { id } = req.params;

    const tags = await knex('moviesTags').where({user_id: id});
    return res.json(tags);
  }
}

module.exports = TagsController;