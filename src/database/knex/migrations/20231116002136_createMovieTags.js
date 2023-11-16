
exports.up = knex => knex.schema.createTable("moviesTags", table => {
  table.increments('id');

  table.integer('movies_id')
    .references('movies.id')
    .notNullable()
    .onDelete('CASCADE');


  table.integer('user_id')
    .references('users.id')
    .notNullable()
    .onDelete('CASCADE');

  table.text('name').notNullable();
});

exports.down = knex => knex.schema.dropTable("moviesTags");
