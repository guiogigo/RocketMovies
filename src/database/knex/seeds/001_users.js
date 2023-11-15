
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
  {
    name: "GuiSeed1",
    email: "GuiSeed1@gmail.com",
    password: "GuiSeed1"
  },
  {
    name: "GuiSeed2",
    email: "GuiSeed2@gmail.com",
    password: "GuiSeed2"
  }
  ]);
};
